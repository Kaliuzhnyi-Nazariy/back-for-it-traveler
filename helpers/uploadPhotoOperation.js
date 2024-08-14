const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const placePhotoPath = path.join(__dirname, "../", "public", "placePhotos");

const uploadPhotoOperation = async (_id, data) => {
  const { path: tempUpload, originalname } = data;

  const resizePhoto = await Jimp.read(tempUpload);
  resizePhoto.resize(76, 76);
  resizePhoto.writeAsync(tempUpload);

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(placePhotoPath, filename);
  await fs.rename(tempUpload, resultUpload);

  const photo = path.join("placePhotos", filename);

  return photo;
};

module.exports = uploadPhotoOperation;
