const { default: bcrypt } = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require(bcrypt);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: ["true", "User email address is required"],
    trim: true,
    unique: true,
    lowercase: lowercase,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  photo: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "PasswordConfirm is required"],

    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and passwordConfirm are not same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function next() {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
