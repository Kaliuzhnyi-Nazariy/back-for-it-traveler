const Joi = require("joi");
const { required } = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const placeSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
    // required: true,
    default: "../public/placePhotos/no-image.png",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const addSchema = Joi.object({
  location: Joi.string().min(3).required(),
  description: Joi.string().min(15).required(),
  coordinates: Joi.array().required(),
  img: Joi.string(),
});

const schemas = { addSchema };

placeSchema.post("save", handleMongooseError);

const Place = model("place", placeSchema);

module.exports = { schemas, Place };
