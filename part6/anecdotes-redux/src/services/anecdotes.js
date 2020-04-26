import Axios from "axios";

const BASE_URL = "http://localhost:3001";

const ANECDOTES_ENDPOINT = BASE_URL + "/anecdotes";

const getAll = () => {
  return Axios.get(ANECDOTES_ENDPOINT).then((res) => res.data);
};

const anecdotes_api = {
  getAll,
};

export default anecdotes_api;
