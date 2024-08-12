const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    next(HttpError(400, `${userId} is not valid!`));
  }
  next();
};

module.exports = isValidId;
