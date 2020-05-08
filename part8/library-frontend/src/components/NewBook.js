import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { M_ADD_BOOK } from "../graphql/mutations";
import {
  Q_ALL_BOOKS,
  Q_ALL_AUTHORS,
  Q_RECOMMENDED_BOOKS,
  Q_ME,
} from "../graphql/queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const user = useQuery(Q_ME);

  const [addBook] = useMutation(M_ADD_BOOK, {
    refetchQueries: [{ query: Q_ALL_AUTHORS }],
    update: (store, response) => {
      const allBooks = store.readQuery({ query: Q_RECOMMENDED_BOOKS });
      store.writeQuery({
        query: Q_RECOMMENDED_BOOKS,
        data: {
          ...allBooks,
          allBooks: [...allBooks.allBooks, response.data.addBook],
        },
      });
      if (
        user.data &&
        response.data.addBook.genres.includes(user.data.me.favouriteGenre)
      ) {
        const recommended = store.readQuery({
          query: Q_RECOMMENDED_BOOKS,
          variables: {
            genre: user.data.me.favouriteGenre,
          },
        });
        store.writeQuery({
          query: Q_RECOMMENDED_BOOKS,
          variables: {
            genre: user.data.me.favouriteGenre,
          },
          data: {
            ...recommended,
            allBooks: [...recommended.allBooks, response.data.addBook],
          },
        });
      }
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
