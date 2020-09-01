import { atom } from "recoil";

export const addPriceState = atom({
  key: "add-price-state",
  default: {
    branchId: null,
    discountIndex: null,
    itemId: null,
    totalPrice: null
  }
});
