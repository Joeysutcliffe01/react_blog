const express = require("express");
const cors = require("cors");
const User = require("./Models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SERCRETCODE;

// Need to come back to origin: "http://localhost:3000"
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.CONNECT);

// ------------------------------------------------------------- register user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// -------------------------------------------------------------  login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  // Issue with the user returning null when wrong username is enterd
  if (userDoc === null) {
    return res.status(400).json("Cant find username in doc");
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

// -------------------------------------------------------------   users profile
app.get(
  "/profile",
  (req, res) => {
    const { token } = req.cookies;

    console.log("req.cookies-----", req.cookies);

    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;

      console.log("info----------", info);
      res.json(info);
    });

    res.json(req.cookies);
  },
  []
);

// -------------------------------------------------------------  logout user
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);
