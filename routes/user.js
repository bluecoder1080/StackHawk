const express = require("express");
const userRouter = express.Router();

// const {Router} = require('express')

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup Endpoint",
  });
});
userRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signin Endpoint",
  });
});
userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchases Endpoint",
  });
});

module.exports = {userRouter};
