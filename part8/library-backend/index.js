const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const Book = require("./models/books");
const Author = require("./models/authors");
const User = require("./models/user");
const pubsub = new PubSub();
mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) => Book.count({ author: root._id }),
  },
  Book: {
    author: (root) => Author.findById(root.author),
  },
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      const filter = {};
      if (args.author) {
        res = res.filter((book) => book.author == args.author);
      }
      if (args.genre) {
        filter.genres = {
          $in: [args.genre],
        };
      }
      return Book.find(filter);
    },
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      const { author: name, ...bookArgs } = args;
      let author = await Author.findOne({ name });
      try {
        if (!author) {
          author = new Author({
            name,
          });
          await author.save();
        }
        const book = new Book({ author: author._id, ...bookArgs });
        await book.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      const { name, setBornTo } = args;
      let author = await Author.findOne({ name });
      if (!author) {
        return null;
      }
      author.born = setBornTo;
      try {
        return author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "password") {
        throw new UserInputError("Wrong credentials");
      }

      return {
        value: jsonwebtoken.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET
        ),
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const header = req ? req.headers.authorization : null;
    if (header && header.toLowerCase().startsWith("bearer ")) {
      const payload = jsonwebtoken.verify(
        header.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(payload.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server running at ${url}`);
  console.log(`Subscriptions pushed at ${subscriptionsUrl}`);
});
