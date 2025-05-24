const mongoose = require("mongoose");
const User = require("./userModel");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must have less than 40 characters"],
      minlength: [10, "A tour name must have more or equal to 10 characters"],
    },
    duration: {
      type: Number,
      required: [true, "A tour musta have a duration"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Ratings must be above 0"],
      max: [5, "Ratings must be below 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Difficulty is either easy, medium or hard",
      },
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: {
          values: ["Point"],
        },
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: Array,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

tourSchema.pre("save", async function (next) {
  const guidesPromise = this.guides.map(async (id) => await User.findById(id));
  this.guides = await Promise.all(guidesPromise);
  next();
});

const Tour = mongoose.model("tour", tourSchema);
module.exports = Tour;
