import axios from "axios";

const baseUrl = "http://localhost:8888/api/persons";
// const baseUrl = "/api/persons" <-- correct path to API resources when hosting on Netlify

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const updateObject = (personObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject);
  return request.then((response) => response.data);
};

const removeObject = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const numberService = { getAll, createNew, updateObject, removeObject };

export default numberService;
