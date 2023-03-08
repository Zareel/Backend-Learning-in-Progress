require("./config/database").connect;
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// import User
const User = require("./model/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello auth system");
});

app.post("/register", async (req, res) => {
  try {
    // collect all information
    const { firstname, lastname, email, password } = req.body;
    //validate the data if exist
    if (!(firstname && lastname && email && password)) {
      res.status(401).send("All fields are required");
    }
    // check if user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already found in database");
    }
    // encrypt the password
    const myEncyPassword = await bcrypt.hash(password, 10);
    // create a new entry in database
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: myEncyPassword,
    });

    // create a token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );

    user.token = token;
    //don't want to send the password
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    console.log("error in response route");
  }
});

app.post("/login", async (req, res) => {
  try {
    //collelct information from frontend
    const { email, password } = req.body;

    //validate
    if (!(email && password)) {
      res.status(401).send("email and password is required");
    }
    //check user in database
    const user = await User.findOne({ email });
    // if the user doesn't exist
    if (useNotExist) {
      res.status(401).send("user doesn't exist");
    }
    //match the password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, "shhhhh", {
        expiresIn: "2h",
      });
      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }

    //create toke and send

    res.sendStatus(400).send("email or password is incorrect");
  } catch (error) {
    console.log(error);
  }
});
