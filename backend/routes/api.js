const express = require("express");
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// verifyToken
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Register/Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    });
    await newuser.save();

    res.status(201).json({ message: "User registered successfully" });

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("User Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
        product: user.product,
        cart: user.cart,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

router.get("/user-data", verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Exclude sensitive fields like password and __v
    const { password, __v, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add to user's cart route
router.post("/add-to-cart", verifyToken, async (req, res) => {
  try {
    const { productId, productQuantity } = req.body;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = user.cart.find((item) => item.productId === productId);
    if (!product) {
      user.cart.push({ productId, productQuantity });
    }
    await user.save();

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/check-in-cart/:productId", verifyToken, async (req, res) => {
  try {
    // Get productId from query params instead of body
    const productId = req.params.productId;
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product exists in cart
    const product = user.cart.find((item) => item.productId === productId);
    const check = product ? "Added" : "Add To Cart";

    res.status(200).json({ status: check });
  } catch (error) {
    console.error("Check in cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get products from the user's cart
router.get("/cart-list", verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail }).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const productIds = user.cart.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    res.status(500).json({ message: "Error retrieving cart products", error });
  }
});

//get product's count from user's cart
router.get("/cart-count", verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail }).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = user.cart;
    res.status(200).json(products.length);
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    res.status(500).json({ message: "Error retrieving cart products", error });
  }
});

// Delete item from cart route
router.delete("/cart/:productId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.cart.splice(productIndex, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get product quantity in cart
router.get("/cart/quantity/:productId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = user.cart.find((item) => item.productId === productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json({ productQuantity: product.productQuantity });
  } catch (error) {
    console.error("Error retrieving product quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Increment product quantity in cart
router.put("/cart/increment/:productId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = user.cart.find((item) => item.productId === productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.productQuantity += 1;
    await user.save();

    res
      .status(200)
      .json({ message: "Product quantity incremented successfully" });
  } catch (error) {
    console.error("Error incrementing product quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Decrement product quantity in cart
router.put("/cart/decrement/:productId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = user.cart.find((item) => item.productId === productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.productQuantity > 1) {
      product.productQuantity -= 1;
      await user.save();
      res
        .status(200)
        .json({ message: "Product quantity decremented successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Product quantity cannot be less than 1" });
    }
  } catch (error) {
    console.error("Error decrementing product quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit the address
router.put("/address/:id", verifyToken, async (req, res) => {
  try {
    const addressId = req.params.id;
    const { street, city, state, zip, country } = req.body;
    const userEmail = req.user.email;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the address index in the user's address array
    const addressIndex = user.address.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the address fields
    user.address[addressIndex].street = street;
    user.address[addressIndex].city = city;
    user.address[addressIndex].state = state;
    user.address[addressIndex].zip = zip;
    user.address[addressIndex].country = country;

    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      address: user.address[addressIndex],
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Add address route
router.post("/add-address", verifyToken, async (req, res) => {
  try {
    const { street, city, state, zip, country } = req.body;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = {
      street,
      city,
      state,
      zip,
      country,
    };

    user.address.push(newAddress);
    await user.save();

    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    console.error("Adding Address error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's addresses
router.get("/address", verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.address);
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete address
router.delete("/address/:id", verifyToken, async (req, res) => {
  try {
    const addressId = req.params.id;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.address.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.address.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
