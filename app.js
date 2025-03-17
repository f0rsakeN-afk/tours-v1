const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);
module.exports = app;
