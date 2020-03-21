import axios from "axios";

const serverAddress =
  process.env["NODE_ENV"] === "development" ? "192.168.0.183" : "5.135.186.3";
const serverPort = 3000;
const sheme = "http";
const serverURL = `${sheme}://${serverAddress}:${serverPort}`;

const API = {
  get: (path, headers) => {
    const options = {
      ...headers,
      "Content-Type": "application/json"
    };
    return axios.get(`${serverURL}${path}`, options);
  },

  post: (path, params, headers) => {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers
      },
      method: "POST",
      data: params
    };

    return axios(`${serverURL}${path}`, options);
  },

  put: (path, params, headers) => {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers
      },
      method: "PUT",
      data: params
    };

    return axios(`${serverURL}${path}`, options);
  }
};

export default API;
