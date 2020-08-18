import { API } from "../../api";

const customAPI = {
  postItem: ({ barcode, barcodeType, brand, name, imgUri }) => {
    let data = new FormData();
    data.append("image", {
      uri: imgUri,
      name: "image.jpg",
      type: "image/jpeg"
    });
    data.append("barcode", barcode);
    data.append("barcode_type", barcodeType);
    data.append("name", name);
    data.append("brand", brand);

    return API.post(`/item`, data, {
      "content-type": `multipart/form-data`
    }).then(({ data }) => data);
  }
};

export default customAPI;
