import { API } from "../../api";

const customAPI = {
  authenticate: (email, password) =>
    API.post("/auth", {
      email,
      password
    }).then(val => val.data)
};

export { customAPI };
