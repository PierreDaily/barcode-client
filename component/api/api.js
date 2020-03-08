import axios from "axios";

const serverAddress =
  process.env["NODE_ENV"] === "development" ? "192.168.0.183" : "5.135.186.3";
const serverPort = 3000;
const sheme = "http";
const serverURL = `${sheme}://${serverAddress}:${serverPort}`;

const get = (path, headers) => {
  const options = {
    ...headers,
    "Content-Type": "application/json"
  };
  return axios.get(`${serverURL}${path}`, options);
};

const post = (path, params, headers) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    },
    method: "POST",
    data: params
  };

  return axios(`${serverURL}${path}`, options);
};

const put = (path, params, headers) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    },
    method: "PUT",
    data: params
  };

  return axios(`${serverURL}${path}`, options);
};

export default API = {
  get,
  post,
  put
};
