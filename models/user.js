const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const addUserSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(15).required(),
});

const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(15).required(),
});

const schemas = {
  addUserSchema,
  loginUserSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { schemas, User };
