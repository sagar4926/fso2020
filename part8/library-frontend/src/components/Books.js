import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Q_ALL_BOOKS } from "../graphql/queries";

const Books = (props) => {
  const result = useQuery(Q_ALL_BOOKS);
  const [filter, setFilter] = useState(undefined);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const genres = [];
  result.data.allBooks.forEach((book) =>
    book.genres.forEach((genre) =>
      !genres.includes(genre) ? genres.push(genre) : null
    )
  );

  const filteredBooks = result.data.allBooks.filter((book) =>
    filter ? book.genres.includes(filter) : true
  );

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      {filter && <button onClick={() => setFilter(undefined)}>Clear</button>}
    </div>
  );
};

export default Books;
