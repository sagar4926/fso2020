import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Q_ALL_AUTHORS } from "../graphql/queries";
import { M_EDIT_AUTHOR_BORN } from "../graphql/mutations";

const Authors = (props) => {
  const result = useQuery(Q_ALL_AUTHORS);
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(M_EDIT_AUTHOR_BORN);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const onSubmit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        name: author,
        setBornTo: Number(born),
      },
    });
    setAuthor("");
    setBorn("");
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Edit author's birth year</h2>
      <form onSubmit={onSubmit}>
        <label>
          Author's name
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          ></input>
        </label>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default Authors;
