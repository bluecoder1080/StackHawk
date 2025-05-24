const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function form() {
    console.log("Connecting ...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected ...");
  app.listen(3000);  // First Mongoose connect  will complete then only it will connect to mongo . 
}

form();
