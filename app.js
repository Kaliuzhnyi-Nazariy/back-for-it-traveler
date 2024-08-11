const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/api/users");
const placesRouter = require("./routes/api/locations");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/places", placesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3001, () => {
  console.log("Backend is started successfully");
});
