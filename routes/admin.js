const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { z } = require("zod");

////////////////////////////////////////////////////////////////////
// SignupZod Schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string().min(6),
  lastName: z.string().min(6),
});
////////////////////////////////////////////////////////////////////
adminRouter.post("/signup", function (req, res) {
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.errors.map((err) => err.message),
    });
  }

  const { email, password, firstName, lastName } = validation.data;
});
adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "This is admin SignIN endpoint",
  });
});

///api/v1/admin/
adminRouter.post("/course", function (req, res) {});
adminRouter.put("/course", function (req, res) {});

adminRouter.get("/course/bulk", function (req, res) {});

module.exports = { adminRouter };
