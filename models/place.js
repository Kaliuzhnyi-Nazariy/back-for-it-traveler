const Joi = require("joi");
const { required } = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(15).required(),
  photo: Joi.string(),
});

const schemas = { addSchema };

placeSchema.post("save", handleMongooseError);

const Place = model("place", placeSchema);

module.exports = { schemas, Place };
