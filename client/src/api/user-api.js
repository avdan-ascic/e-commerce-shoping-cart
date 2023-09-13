import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/users/create`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const login = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/users/login`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const isAuthenticated = async () => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/users/is-authenticated`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const logout = async () => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/users/logout`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, login, isAuthenticated, logout };
