const bcrypt = require("bcrypt");
const express = require("express");
const { z } = require("zod");
const userRouter = express.Router();
const { userModel } = require("../db"); // make sure this path is correct
const { email } = require("zod/v4");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtuser = process.env.JWT_SECRET_USER;

console.log("Secret key is:", jwtuser);

userRouter.use(express.json());
// Signup Route
userRouter.post("/signup", async function (req, res) {
  // 1. Zod validation schema
  const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
  });

  // 2. Validate user input
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: validation.error.errors.map(
        (err) => `${err.path[0]}: ${err.message}`
      ),
    });
  }

  // 3. Destructure data from validated input
  const { email, password, firstName, lastName } = validation.data;

  const hashedPassword = await bcrypt.hash(password, 5);

  // 5. Create user
  await userModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  // 6. Success response
  res.status(200).json({ message: "Signup successful" });
});
// Signin Route With Jwt verification
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });
  if (!user) {
    res.status(404).send({
      message: "User Not Found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      jwtuser,
      { expiresIn: "1d" }
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Wrong Crediantials !!!",
    });
  }
});

module.exports = { userRouter };
