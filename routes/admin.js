const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");

////////////////////////////////////////////////////////////////////
// SignupZod Schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string().min(6),
  lastName: z.string().min(6),
});
////////////////////////////////////////////////////////////////////
adminRouter.post("/signup", async function (req, res) {
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.errors.map((err) => err.message),
    });
  }

  const { email, password, firstName, lastName } = validation.data;

  ////////////////////////////////////////////////////////////////////
  // becrypting the passwords

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/////////////////////////// SignIn Route/////////////////////////////////
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
