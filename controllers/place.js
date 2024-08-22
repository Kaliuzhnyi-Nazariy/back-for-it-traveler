const { ctrlWrapper, HttpError, uploadPhotoOperation } = require("../helpers");
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
  console.log(req);
  if (req.file) {
    const img = uploadPhotoOperation(owner, req.file);

    const result = await Place.create({ ...req.body, owner, img });

    res.json(result);
  } else {
    console.log(req.body);
    const result = await Place.create({ ...req.body, owner });
    res.json(result);
  }
};

const updatePlace = async (req, res) => {
  const { placeId } = req.params;
  if (req.file) {
    const img = await uploadPhotoOperation(placeId, req.file);
    const place = await Place.findByIdAndUpdate(
      placeId,
      { ...req.body, img },
      { new: true }
    );
    res.json(place);
  } else {
    const place = await Place.findByIdAndUpdate(placeId, req.body, {
      new: true,
    });
    res.json(place);
  }
};

const deletePlace = async (req, res) => {
  const { placeId } = req.params;
  const place = await Place.findByIdAndDelete(placeId);
  if (!place) {
    throw HttpError(404);
  }
  res.json({ place, message: "deletePlace" });
};

// const updatePhoto = async (req, res) => {
//   const { _id } = req.user;
//   if (!req.file) {
//     throw HttpError(400, "Please add a photo!");
//   }

//   const { path: tempUpload, originalname } = req.file;

//   const resizePhoto = await Jimp.read(tempUpload);
//   resizePhoto.resize(76, 76);
//   resizePhoto.writeAsync(tempUpload);

//   const filename = `${_id}_${originalname}`;

//   const resultUpload = path.join(placePhotoPath, filename);
//   await fs.rename(tempUpload, resultUpload);

//   const photo = path.join("placePhotos", filename);

//   await Place.findOneAndUpdate({ owner: _id }, { photo });

//   res.json({
//     photo,
//   });
// };

module.exports = {
  getPlaces: ctrlWrapper(getPlaces),
  getPlacesById: ctrlWrapper(getPlacesById),
  postPlace: ctrlWrapper(postPlace),
  updatePlace: ctrlWrapper(updatePlace),
  deletePlace: ctrlWrapper(deletePlace),
  // updatePhoto: ctrlWrapper(updatePhoto),
};
