export default Const = {
  serverAddress:
    process.env["NODE_ENV"] === "development" ? "192.168.0.183" : "5.135.186.3",
  serverPort: 3000
};
