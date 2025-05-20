const express = require("express");
const courseRouter = express.Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Purchase Endpoint",
  });
});
courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "Courses Endpoint",
  });
});

module.exports = { courseRouter };
