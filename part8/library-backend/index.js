const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/books");
const Author = require("./models/authors");

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

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) => Book.count({ author: root._id }),
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
        return book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
