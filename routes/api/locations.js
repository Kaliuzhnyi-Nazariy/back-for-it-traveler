const express = require("express");
const ctrl = require("../../controllers/place");
const { validateBody, authenticated } = require("../../middlewares");
const { schemas } = require("../../models/place");

const router = express.Router();

router.get("/", authenticated, ctrl.getPlaces);

router.get("/:placeId", authenticated, ctrl.getPlacesById);

router.post(
  "/",
  authenticated,
  validateBody(schemas.addSchema),
  ctrl.postPlace
);

router.put(
  "/:placeId",
  authenticated,
  validateBody(schemas.addSchema),
  ctrl.updatePlace
);

router.delete("/:placeId", authenticated, ctrl.deletePlace);

module.exports = router;
