import axios from "axios";
import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (data) => {
  try {
    const response = await axios
      .post(`${baseUrl.server}/api/promotion/create`, data, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const getPromotion = async (code) => {
  try {
    const response = await axios
      .get(`${baseUrl.server}/api/promotion/get-promotion/${code}`, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, getPromotion };
