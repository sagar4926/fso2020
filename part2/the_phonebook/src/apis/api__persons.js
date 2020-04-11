import axios from "axios";

const BASE_URL = "http://localhost:3001";
const PERSONS_URL = `${BASE_URL}/persons`;

const getAll = () => {
  return axios.get(PERSONS_URL).then((res) => res.data);
};

const create = (payload) => {
  return axios.post(PERSONS_URL, payload).then((res) => res.data);
};

export default { getAll, create };
