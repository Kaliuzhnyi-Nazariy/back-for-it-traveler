const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const getAll = async (req, res) => {
  const result = await User.find({}, "email username token");
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findById(userId, "eamil username");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "E-mail already in use!");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({ email: newUser.email, username: newUser.username });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    next(HttpError(404, "Not found!"));
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    next(HttpError(401, "Invalid email or password!"));
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2d" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    username: user.username,
    email: user.email,
    token,
  });
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if (!result) {
    next(HttpError(404, "Not found"));
  }
  res.json(result);
};

const logout = async (req, res) => {
  const user = req.user;
  const result = await User.findByIdAndUpdate(user.id, { token: "" });
  res.json({ message: "Logged out successfully" });
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  const result = await User.findByIdAndDelete(userId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result, message: "Deleted successfully!" });
};

const refresh = async (req, res) => {
  const user = req.user;
  if (!user) throw HttpError(404);
  res.json({ name: user.username });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateUser: ctrlWrapper(updateUser),
  logout: ctrlWrapper(logout),
  deleteUser: ctrlWrapper(deleteUser),
  refresh: ctrlWrapper(refresh),
};
