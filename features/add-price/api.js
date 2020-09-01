import { API } from "../../api";

const customAPI = {
  postPrice: ({ branchId, discountIndex, itemId, totalPrice }) => {
    return API.post("/price", {
      branchId,
      discountIndex,
      itemId,
      totalPrice: totalPrice * 100
    }).then(({ data }) => data);
  }
};

export default customAPI;
