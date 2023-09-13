import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data) => {
  try {
    const response = await axios.post(`${baseUrl.server}/api/order/create`, data, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export { create };
