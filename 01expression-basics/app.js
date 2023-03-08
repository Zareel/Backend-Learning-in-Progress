const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.send("<h1>Hello from the elegant, famous Zareel kalam</h1>");
  res.status(200).send("<h1>Hello from Zareel</h1>");
});

app.get("/zareel", (req, res) => {
  res.send("Linkedin");
});

app.get("/features", (req, res) => {
  res.send("A test runner build for humans");
});

app.get("/insta", (req, res) => {
  const insta = {
    userName: "Zareel Kalam",
    followrs: 10000,
    follow: 1000,
  };
  res.status(200).json({ insta });
});

app.get("/api/twitter", (req, res) => {
  const twitter = {
    userName: "zareelkalam",
    followers: 100000,
    follow: 10,
  };
  res.status(200).json({ twitter });
});

app.get("/api/vi/:token", (req, res) => {
  console.log(req.params.token);
  res.status(200).json({ param: req.params.token });
});

app.listen(port, () => {
  console.log(`I am well able to listen very well at the port ${port}`);
});

// assignment
