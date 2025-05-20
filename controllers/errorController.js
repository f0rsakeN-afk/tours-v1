const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value"${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpireError = (err) =>
  new AppError("Your token has expired! Please log in again", 401);

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError") error = handleJWTExpireError(error);
    sendErrorProd(error, res);
  }
};
