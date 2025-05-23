const express = require("express");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("development"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later",
});

app.use("/api", limiter);

app.use(xss());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

app.use(mongoSanitize());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

/* app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this ${req.originalUrl} on this server`, 404));
});

 */
module.exports = app;
