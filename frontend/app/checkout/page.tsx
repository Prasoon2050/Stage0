"use client";
import React, { useState, useEffect } from "react";
import AddAddress from "@/components/AddAddress";
import DisplayAddress from "@/components/DisplayAddress";
import AmountSummary from "@/components/AmountSummary";
import DisplayCartList from "@/components/DisplayCartList";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [buyNowProductId, setBuyNowProductId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);


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

  if (isBuyNow) {
    if (isBuyNow && cartItems) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:5000/api/add-to-cart", {
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
          console.error("Error adding to cart  yo yo:", error);
        });
    }
    setIsBuyNow(false);
    localStorage.removeItem("BuyNow");
    localStorage.removeItem("buyNowProductId");
  }

  const handleAddressAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment key to trigger re-render
  };

  return (
    <div className="padding-container py-10 flex space-x-7 bg-gray-300">
      <div className="w-2/3 space-y-10">
        <div className="bg-white">
          <div className="bg-black text-white p-4">Delivery Address</div>
          <div className="p-4 space-y-4">
            <DisplayAddress key={refreshKey} />
            <AddAddress onAddressAdded={handleAddressAdded} />
          </div>
        </div>
        <div className="bg-white">
          <div className="bg-black text-white p-4">Payment</div>
          <div className="p-4 space-y-4">Prasoon will take care </div>
          <div className="p-4 space-y-4">Prasoon will take care </div>
        </div>
        <div className="bg-white">
          <div className="bg-black text-white p-4">Review</div>
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
      <div className="w-1/3">
        <AmountSummary cartItems={cartItems} quantities={quantities} />
      </div>
    </div>
  );
};

export default Page;
