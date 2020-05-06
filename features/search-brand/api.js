import { API } from "../../api";

const customAPI = {
  postBrand: name => {
    return API.post("/brand", { name }).then(({ data }) => data);
  },
  searchBrand: name =>
    name !== ""
      ? API.get(`/brand-search/${name}`).then(({ data }) => data)
      : Promise.resolve([])
};

export default customAPI;
