const { ctrlWrapper, HttpError } = require("../helpers");
const { Place } = require("../models/place");

const getPlaces = async (req, res) => {
  const { _id: owner } = req.user;
  const place = await Place.find({ owner });
  res.json(place);
};

const getPlacesById = async (req, res) => {
  const { placeId } = req.params;
  const place = await Place.findById(placeId);
  res.json(place);
};

const postPlace = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Place.create({ ...req.body, owner });
  res.json(result);
};

const updatePlace = async (req, res) => {
  const { placeId } = req.params;
  const place = await Place.findByIdAndUpdate(placeId, req.body, { new: true });
  res.json(place);
};

const deletePlace = async (req, res) => {
  const { placeId } = req.params;
  const place = await Place.findByIdAndDelete(placeId);
  if (!place) {
    throw HttpError(404);
  }
  res.json({ place, message: "deletePlace" });
};

module.exports = {
  getPlaces: ctrlWrapper(getPlaces),
  getPlacesById: ctrlWrapper(getPlacesById),
  postPlace: ctrlWrapper(postPlace),
  updatePlace: ctrlWrapper(updatePlace),
  deletePlace: ctrlWrapper(deletePlace),
};
