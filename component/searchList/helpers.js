const getErrMsg = err => {
  if (err && err.response && err.response.data && err.response.data.message) {
    return err.response.data.message;
  }

  return "";
};

export default getErrMsg;
