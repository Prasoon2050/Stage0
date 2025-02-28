const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  imageUrl: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviews: [
    {
      username: {
        type: String,
        trim: true,
      },
      reviewText: {
        type: String,
        trim: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
