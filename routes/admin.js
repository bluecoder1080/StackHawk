const { Router } = require("express");
const bcrypt = require("bcrypt");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { z } = require("zod");
const express = require("express");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const jwtadmin = process.env.JWT_SECRET_ADMIN;
console.log(jwtadmin);

adminRouter.use(express.json());

//Signup EndPoint ...
adminRouter.post("/signup", async function (req, res) {
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
  await adminModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  // 6. Success response
  res.status(200).json({ message: "Signup successful" });
});

//Signin EndPoint ...
adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email: email,
  });
  if (!admin) {
    res.status(404).send({
      message: "admin Not Found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (isPasswordMatch) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      jwtadmin,
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
// Create Course EndPoint ...
adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, discription, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title,
    discription,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.json({
    message: "Course Created !!!",
    courseId: course._id,
  });
});
///api/v1/admin/
// Update the Course ..
adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const { title, discription, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      discription,
      imageUrl,
      price,
      creatorId: adminId,
    }
  );

  res.json({
    message: "Course Updated !!!",
    courseId: course._id,
  });
});

adminRouter.put("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "Course Updated !!!",
    courses,
  });
});

adminRouter.get("/course/bulk", function (req, res) {});

module.exports = { adminRouter };
