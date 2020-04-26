import Axios from "axios";

const BASE_URL = "http://localhost:3001";

const ANECDOTES_ENDPOINT = BASE_URL + "/anecdotes";

const getAll = () => {
  return Axios.get(ANECDOTES_ENDPOINT).then((res) => res.data);
};

const create = (payload) => {
  return Axios.post(ANECDOTES_ENDPOINT, payload).then((res) => res.data);
};

const update = (id, payload) => {
  return Axios.patch(`${ANECDOTES_ENDPOINT}/${id}`, payload).then(
    (res) => res.data
  );
};
const anecdotes_api = {
  getAll,
  create,
  update,
};

export default anecdotes_api;
