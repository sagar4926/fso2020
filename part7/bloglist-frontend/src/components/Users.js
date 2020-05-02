import React from "react";
import { useSelector } from "react-redux";

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};
const Users = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Users;
