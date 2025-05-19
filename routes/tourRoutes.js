const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .patch(tourController.updateTour)
  .get(tourController.getTourById)
  .delete(authController.protect,authController.restrictTo('admin'),tourController.deleteTour);
module.exports = router;
