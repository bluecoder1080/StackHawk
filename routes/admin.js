const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {
  
  res.json({
    message: "This is admin Signup endpoint",
  });
});
adminRouter.post("/signin", function (req, res) {});
adminRouter.post("/course", function (req, res) {});
adminRouter.put("/course", function (req, res) {});
adminRouter.get("/course/bulk", function (req, res) {});

module.exports = { adminRouter };
