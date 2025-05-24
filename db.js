const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//User Schema
const userSchema = new Schema({
  userId: ObjectId,
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

//Course Schema

const courseSchema = new Schema({
  title: String,
  description: String,
  price: String,
  imageUrl: String,
});

// admin Schema

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  creatorId: ObjectId,
});

// purchase Schema

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.export = {
  userModel,
  courseModel,
  adminModel,
  purchaseModel,
};
