const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const validation = (req, res, next) => {
    const { error } = schema.validate(re.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return validation;
};

module.exports = validateBody;
