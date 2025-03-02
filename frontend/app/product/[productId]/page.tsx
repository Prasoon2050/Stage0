"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Cards from "@/components/Card";
import { useParams } from "next/navigation";
import LoginPage from "@/app/login/page";

function ProductDetails() {
  const { productId } = useParams();

  interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkAddToCart, setCheckAddToCart] = useState<string>("Add To Cart");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const redirectActionRef = useRef<string>("");

  // Fetch single product data
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/product/${productId}`
          );
          const data = await response.json();
          if (response.ok) {
            setProduct(data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoadingProduct(false);
        }
      };
      fetchProduct();
    } else {
      setLoadingProduct(false);
    }
  }, [productId]);

  // Check cart status
  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setCheckAddToCart("Add To Cart");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/check-in-cart/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCheckAddToCart(data.status); // Update button text
        } else {
          console.error("Error checking cart status:", data.message);
        }
      } catch (error) {
        console.error("Error checking cart status:", error);
      }
    };

    if (productId) {
      checkCartStatus();
    }
  }, [productId]);

  // Fetch other products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Show a loading indicator while the product is being fetched
  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  // If loading is complete and product is still null, display a friendly message
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  const cartItems = [product];
  const quantities = { [product._id]: 1 };
  const BuyNow = true;

  const handleCheckoutClick = () => {
    if (product) {
      localStorage.setItem("buyNowProductId", JSON.stringify(product._id));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("quantities", JSON.stringify(quantities));
      localStorage.setItem("BuyNow", JSON.stringify(BuyNow));
      window.location.href = "/checkout";
    }
  };

  const handleAddToCart = async () => {
    try {
      console.log("inside handleAddToCart");
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, productQuantity: 1 }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Product added to cart successfully");
        window.location.href = "/cart";
      } else {
        if (response.status === 401) {
          console.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Check login status and trigger login dialog if needed.
  const handleLoginCheck = (action: string) => {
    redirectActionRef.current = action;
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setShowLoginDialog(true);
      return;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setShowLoginDialog(true);
      return;
    }
    setIsLoggedIn(true);
    handleRedirect(redirectActionRef.current);
  };

  const handleRedirect = (action: string) => {
    console.log("Inside handleRedirect, action =", action);
    if (action === "checkout") {
      handleCheckoutClick();
    } else if (action === "addToCart") {
      handleAddToCart();
    }
    redirectActionRef.current = "";
  };

  return (
    <div className="max-container padding-container">
      <div className="flex flex-col lg:flex-row py-4 pb-32 lg:py-10 space-y-8 lg:space-y-0">
        <div className="flex items-center justify-center lg:w-1/2">
          <Image
            className="rounded-2xl shadow-lg"
            src={product.imageUrl[0]}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>

        <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
          <div key={product._id} className="text-center lg:text-left space-y-4">
            <div className="font-serif text-2xl lg:text-4xl font-bold">
              {product.name}
            </div>
            <div className="text-base text-gray-600 mt-4">{product.name}</div>
            <div className="font-mono text-2xl lg:text-3xl font-bold mt-4">
              Rs {product.price}
            </div>

            {/* Size Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
              {["Sm", "Md", "L", "XL"].map((size) => (
                <Button
                  key={size}
                  type="button"
                  title={size}
                  variant="btn_white_text"
                />
              ))}
            </div>

            {/* Delivery Pin */}
            <div className="mt-4 w-full">
              <label
                htmlFor="deliveryPin"
                className="block text-lg font-medium text-gray-700"
              >
                Delivery Pin Code
              </label>
              <input
                id="deliveryPin"
                type="text"
                placeholder="Enter pin code"
                className="mt-1 block w-full px-3 py-2 text-xl border-gray-300 rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="mt-6 text-lg text-gray-700">
              <h3 className="font-semibold">Product Details:</h3>
              <p>{product.description}</p>
            </div>

            {/* Product Description */}
            <div className="mt-6 text-lg text-gray-700">
              <h3 className="font-semibold">Product Description:</h3>
              <p>{product.description}</p>
            </div>

            {/* Artist Details */}
            <div className="mt-6 text-lg text-gray-700">
              <h3 className="font-semibold">Artist Information:</h3>
              <p>{product.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center lg:justify-start gap-4 mt-6 lg:mt-0 fixed bottom-0 left-0 w-full bg-white lg:static">
              <button
                type="button"
                className="btn_white_text gap-20 items-center justify-center rounded-full border"
                onClick={() => handleLoginCheck("addToCart")}
              >
                {checkAddToCart}
              </button>
              <div onClick={() => handleLoginCheck("checkout")}>
                <Button type="button" title="Buy Now" variant="btn_dark" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optionally display other products */}
      <div>
        <div className="pb-20">
          <div className="flexBetween">
            <div>
              <h2 className="bold-32 lg:bold-40 pb-5">Latest</h2>
            </div>
            <div>
              <Button type="button" title="View All" variant="btn_white_text" />
            </div>
          </div>
          <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Cards
                key={product._id}
                img={product.imageUrl}
                title={product.name}
                price={product.price}
                id={product._id}
              />
            ))}
          </div>
        </div>
      </div>
      {showLoginDialog && (
        <LoginPage
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLoginSuccess={() => {
            setShowLoginDialog(false);
            setIsLoggedIn(true);
            handleRedirect(redirectActionRef.current);
          }}
        />
      )}
    </div>
  );
}

export default ProductDetails;
