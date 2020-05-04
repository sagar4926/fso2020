import React from "react";
import { useQuery } from "@apollo/client";
import { Q_ALL_AUTHORS } from "../graphql/queries";

const Authors = (props) => {
  const result = useQuery(Q_ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if(result.loading) {
    return <div>loading...</div>
  }  
  
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
    </div>
  );
};

export default Authors;
