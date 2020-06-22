import axios from "axios";
import { Tokens } from "./class";

const serverAddress =
  process.env["SERVER_ADDRESS"] === "development"
    ? "192.168.0.183"
    : "pierredaily.com";
const serverPort = process.env["NODE_ENV"] === "development" ? 3001 : 3000;
const sheme = process.env["NODE_ENV"] === "development" ? "http" : "https";
const serverURL = `${sheme}://${serverAddress}:${serverPort}`;
const auth = new Tokens();

const API = {
  _getNewAccessToken: async function(refreshToken) {
    try {
      return await API.post("/auth", {}, { refresh_token: refreshToken }).then(
        ({ data: { access_token } }) => access_token
      );
    } catch (err) {
      return null;
    }
  },

  _fetch: async (method, path, params, headers) => {
    const options = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
        ...headers
      },
      method,
      data: params
    };

    try {
      return await axios(`${serverURL}${path}`, options);
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        auth.accessToken = await API._getNewAccessToken(auth.refreshToken);

        if (auth.accessToken) {
          const updatedOptions = {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${auth.accessToken}`
            }
          };
          return axios(`${serverURL}${path}`, updatedOptions);
        } else {
          throw new Error("can't get a new access token");
        }
      } else {
        throw err;
      }
    }
  },
  get: (path, headers) => API._fetch("GET", path, null, headers),
  post: (path, params, headers) => API._fetch("POST", path, params, headers),
  put: (path, params, headers) => API._fetch("PUT", path, params, headers)
};

export { API };
