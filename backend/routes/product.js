const express = require("express");
const Product = require("../models/product"); // Assuming you have a Product model defined

const router = express.Router();

// Add a new product
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
});

// Get products in batches of 10
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

// get api to get products on basis of category
router.get("/category/:category", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const products = await Product.find({ category: req.params.category })
      .skip(skip)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

module.exports = router;
