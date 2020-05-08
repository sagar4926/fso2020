import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Q_RECOMMENDED_BOOKS, Q_ME } from "../graphql/queries";

const Recommendations = (props) => {
  const meResult = useQuery(Q_ME);
  const [getBooks, booksResult] = useLazyQuery(Q_RECOMMENDED_BOOKS);
  const [filter, setFilter] = useState(undefined);

  useEffect(() => {
    if (meResult.data) {
      console.log("Getting recommended books");
      getBooks({
        variables: {
          genre: meResult.data.me.favouriteGenre,
        },
      });
    }
  }, [meResult.data]);

  if (!props.show) {
    return null;
  }

  if (meResult.loading) {
    return <div>loading...</div>;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre{" "}
        <strong>{meResult.data.me.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
