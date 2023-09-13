import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const multipartHeaders = {
  "Content-Type": "multipart/form-data",
};

const create = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/books/create`, data, { multipartHeaders });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const readAll = async () => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/books/read-all`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readById = async (id) => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/books/${id}`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readByTitle = async (title) => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/books/read-by-title/${title}`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const update = async (data, id) => {
  try {
    const response = await axios
      .put(`${baseUrl.server}/api/books/${id}`, data, { multipartHeaders });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const remove = async (id) => {
  try {
    const response = await axios
      .delete(`${baseUrl.server}/api/books/${id}`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, readAll, readById, readByTitle, update, remove };
