const express = require("express");
const { validateBody, isValidId, authenticated } = require("../../middlewares");

const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/user");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/me", authenticated, ctrl.refresh);

router.get("/:userId", isValidId, ctrl.getById);

router.post("/register", validateBody(schemas.addUserSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginUserSchema), ctrl.login);

router.post("/logout", authenticated, ctrl.logout);

router.put(
  "/:userId",
  isValidId,
  validateBody(schemas.addUserSchema),
  ctrl.updateUser
);

router.delete("/:userId", isValidId, ctrl.deleteUser);

module.exports = router;
