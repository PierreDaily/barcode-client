import API from "../api/api";

const customAPI = {
  postBrand: name => {
    return API.post("/brand", { name }).then(({ data }) => data);
  },
  searchBrand: name =>
    name !== ""
      ? API.get(
          `/brand-search/${name}`,
          { name: name.toLowerCase() },
          { "Content-Type": "application/json" }
        ).then(({ data }) => data)
      : Promise.resolve([])
};

export default customAPI;
