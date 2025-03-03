"use client";
import React, { useState, useEffect } from "react";
import AmountSummary from "@/components/checkout/AmountSummary";
import DisplayCartList from "@/components/DisplayCartList";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import LoginPage from "../login/page";
import { useUserContext } from "@/constants/UserContext";
import SelectAddress from "@/components/checkout/SelectAddress";
import OrderSummary from "@/components/checkout/OrderSummary";
import LoggedAccount from "@/components/checkout/LoggedAccount";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [buyNowProductId, setBuyNowProductId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Get user info from context.
  const { user } = useUserContext();
  const isLoggedIn = Boolean(user);

  // Retrieve cart data and Buy Now flag from localStorage on mount.
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

  // Handle "Buy Now" logic with async/await.
  useEffect(() => {
    const handleBuyNow = async () => {
      if (isBuyNow && cartItems.length > 0) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await fetch(
              "http://localhost:5000/api/add-to-cart",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  productId: buyNowProductId,
                  productQuantity: 1,
                }),
              }
            );
            const data = await response.json();
            if (data.success) {
              console.log("Product from Buy Now added to cart successfully");
            }
          } catch (error) {
            console.error("Error adding to cart:", error);
          }
        }
      }
      if (isBuyNow) {
        setIsBuyNow(false);
        localStorage.removeItem("BuyNow");
        localStorage.removeItem("buyNowProductId");
      }
    };

    handleBuyNow();
  }, [isBuyNow, cartItems, buyNowProductId]);

  // When an address is added, refresh the DisplayAddress component.
  const handleAddressAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // If user is not logged in, show a login prompt.
  if (!isLoggedIn) {
    return (
      <div className="bg-gray-200 py-10 min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Please login to proceed to checkout.</p>
        <button
          onClick={() => setShowLoginDialog(true)}
          className="btn_dark rounded-full px-6 py-3"
        >
          Login
        </button>
        {showLoginDialog && (
          <LoginPage
            open={showLoginDialog}
            onClose={() => setShowLoginDialog(false)}
            onLoginSuccess={() => {
              setShowLoginDialog(false);
              window.location.reload();
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-200 py-10 min-h-screen">
      <div className="max-container mx-auto px-4">
        {/* Flex layout for columns */}
        <div className="flex flex-col md:flex-row gap-7">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-10">
            {/* Logged Account Section */}
            <LoggedAccount />
            {/* Delivery Address Section */}
            <SelectAddress />
            {/* Order Summary Section */}
            <OrderSummary
              cartItems={cartItems}
              quantities={quantities}
              setCartItems={setCartItems}
              setQuantities={setQuantities}
            />
            {/* Payment Section */}
            {/* <div className="bg-white rounded-xl shadow-lg">
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
            </div> */}
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
