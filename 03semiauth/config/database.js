const mongoose = require("mongoose");

const MONGODB_URL = "Somestring";

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Successfully connected with DB"))
    .catch((error) => {
      console.log("DB connection failed");
      console.log(error);
      process.exit(1);
    });
};
