import mongoose from "mongoose";
import bcrypt from "bcrypt";

const nameRegex = /^[0-9A-Za-z\s]+$/;
const lettersOnlyRegex = /^[A-Za-z ]+$/;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required!",
    maxLength: [16, "Username must not exceed more than 16 characters!"],
    match: [
      nameRegex,
      "Username name accepts only letters, numbers and spaces!",
    ],
  },
  password: {
    type: String,
    required: "Password is required!",
  },
  name: {
    type: String,
    trim: true,
    required: "Name is required!",
    maxLength: [30, "First name must not exceed more than 30 characters!"],
    match: [nameRegex, "First name accepts only letters, numbers and spaces!"],
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required!",
    match: [/.+\@.+\../, "Please enter a valid email address!"],
  },
  member: {
    type: Boolean,
    default: false,
  },
  manager: {
    type: Boolean,
    default: false,
  },
  address: {
    street: {
      type: String,
      required: "Street is required!",
    },
    city: {
      type: String,
      required: "City is required!",
      match: [lettersOnlyRegex, "City can only contain letters!"],
    },
    zipCode: {
      type: String,
      required: "ZIP Code is required!",
    },
    country: {
      type: String,
      required: "Country is required!",
      match: [lettersOnlyRegex, "Country can only contain letters!"],
    },
  },
});

userSchema.pre("save", async function (next) {
  const userModel = mongoose.model("user", userSchema);

  // Check for unique username
  const checkUsername = await userModel.findOne({ username: this.username });
  if (checkUsername) return next(new Error("Username is already in use!"));

  // Check for unique email
  const checkEmail = await userModel.findOne({ email: this.email });
  if (checkEmail) return next(new Error("Email is already in use!"));

  // Password validation / hashing
  if (this.password.length < 6)
    next(new Error("Password must contain at least 6 characters!"));

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(new Error(err));
  }
});

export default mongoose.model("user", userSchema);
