import axios from "axios";
const baseUrl = "/api/contacts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newContact) => {
  const response = await axios.post(baseUrl, newContact);
  return response.data;
};

const update = async (id, newContact) => {
  const response = await axios.put(`${baseUrl}/${id}`, newContact);
  return response.data;
};

const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, update, deleteContact };