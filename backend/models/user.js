const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  ],
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  product: [
    {
      type: String,
    },
  ],
  cart: [
    {
      productId: String,
      productQuantity: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
