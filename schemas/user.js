const joi = require("joi");

const addUserSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(15).required(),
});

module.exports = addUserSchema;
