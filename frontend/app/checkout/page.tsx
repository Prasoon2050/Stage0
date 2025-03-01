"use client";
import React, { useState, useEffect } from "react";
import AddAddress from "@/components/AddAddress";
import DisplayAddress from "@/components/DisplayAddress";
import AmountSummary from "@/components/AmountSummary";
import DisplayCartList from "@/components/DisplayCartList";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [buyNowProductId, setBuyNowProductId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Retrieve cart data from localStorage on mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const storedQuantities = localStorage.getItem("quantities");
    const formBuyNow = localStorage.getItem("BuyNow");
    const storedBuyNowProductId = localStorage.getItem("buyNowProductId");

    if (storedCartItems && storedQuantities) {
      setCartItems(JSON.parse(storedCartItems));
      setQuantities(JSON.parse(storedQuantities));
      setIsBuyNow(formBuyNow ? JSON.parse(formBuyNow) : false);
      setBuyNowProductId(
        storedBuyNowProductId ? JSON.parse(storedBuyNowProductId) : ""
      );
    }
  }, []);

  // Handle "Buy Now" logic if applicable
  useEffect(() => {
    if (isBuyNow && cartItems.length > 0) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:5000/api/check-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: buyNowProductId,
          productQuantity: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Product from Buy Now added to cart successfully");
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
    if (isBuyNow) {
      setIsBuyNow(false);
      localStorage.removeItem("BuyNow");
      localStorage.removeItem("buyNowProductId");
    }
  }, [isBuyNow, cartItems, buyNowProductId]);

  const handleAddressAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="bg-gray-200 py-10 min-h-screen">
      <div className="max-container mx-auto px-4">
        {/* Flex layout for columns */}
        <div className="flex flex-col md:flex-row gap-7">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-10">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="bg-black text-white p-4 rounded-t-xl">
                <h2 className="text-xl font-bold">Delivery Address</h2>
              </div>
              <div className="p-4 space-y-4">
                <DisplayAddress key={refreshKey} />
                <AddAddress onAddressAdded={handleAddressAdded} />
              </div>
            </div>
            {/* Payment Section */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="bg-black text-white p-4 rounded-t-xl">
                <h2 className="text-xl font-bold">Payment</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-semibold">Payment Method</h3>
                  <p className="text-gray-600">Visa ending in 1234</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Change Payment Method
                  </button>
                </div>
              </div>
            </div>
            {/* Review Section */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="bg-black text-white p-4 rounded-t-xl">
                <h2 className="text-xl font-bold">Review Your Order</h2>
              </div>
              <div className="p-4 space-y-4">
                <DisplayCartList
                  cartItems={cartItems}
                  quantities={quantities}
                  setCartItems={setCartItems}
                  setQuantities={setQuantities}
                />
              </div>
            </div>
          </div>
          {/* Right Column (Sticky) */}
          <div className="w-full md:w-1/3 relative">
            <div className="sticky top-10 self-auto">
              <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col space-y-5 items-center">
                <AmountSummary cartItems={cartItems} quantities={quantities} />
                <Link href="/checkout">
                  <Button
                    type="button"
                    title="Place Order"
                    variant="btn_dark"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
