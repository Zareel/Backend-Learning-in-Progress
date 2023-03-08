require("dotenv").config();
const express = require("express");
const User = require("./model/user");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome Zareel to the IT World</h1>");
});

app.post("/signup", async (req, res) => {
  // for all mandatory fields
  const { firstName, lastName, email, password } = req.body;
  if (!(email && password && firstName && lastName)) {
    res.status(400).send("All the fields are required");
  }

  // unique email

  const extuser = await User.findOne(email);
  if (extuser) {
    res.status(400).send("User Already Exit");
  }

  //password
});

module.exports = app;
