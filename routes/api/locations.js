const express = require("express");
const ctrl = require("../../controllers/place");
const {
  validateBody,
  authenticated,
  uploadPhoto,
} = require("../../middlewares");
const { schemas } = require("../../models/place");

const router = express.Router();

router.get("/", authenticated, ctrl.getPlaces);

router.get("/:placeId", authenticated, ctrl.getPlacesById);

router.post(
  "/",
  authenticated,
  uploadPhoto.single("photo"),
  validateBody(schemas.addSchema),
  ctrl.postPlace
);

router.put(
  "/",
  authenticated,
  validateBody(schemas.upgradeSchema),
  uploadPhoto.single("photo"),
  ctrl.updatePlace
);

router.delete("/:placeId", authenticated, ctrl.deletePlace);

module.exports = router;
