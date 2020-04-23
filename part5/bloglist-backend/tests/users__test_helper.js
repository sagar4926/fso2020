const initial_data = [
  {
    name: "John",
    username: "john",
    hashed_password: "12324324",
  },
  {
    name: "Jane",
    username: "jane",
    hashed_password: "sknflkbgb",
  },
];
const new_data = {
  name: "Mark",
  username: "marc",
  password: "secret",
};
const invalid_data = {
  name: "Mark",
};

module.exports = {
  initial_data,
  new_data,
  invalid_data,
};
