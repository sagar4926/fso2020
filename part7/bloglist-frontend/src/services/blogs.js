import axios from "axios";
import storageService from "./storage";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (payload) => {
  const user = storageService.getUser();
  return axios
    .post(baseUrl, payload, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => response.data);
};

const update = (id, payload) => {
  return axios
    .put(`${baseUrl}/${id}`, payload)
    .then((response) => response.data);
};

const _delete = (id) => {
  const user = storageService.getUser();
  return axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};
export default { getAll, create, update, delete: _delete };
