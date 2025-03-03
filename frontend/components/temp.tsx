"use client";
import React, { useState } from "react";
import Link from "next/link";
import DisplayCartList from "@/components/DisplayCartList";
import AmountSummary from "@/components/checkout/AmountSummary";
import Button from "@/components/Button";
import useFetchCartData from "@/components/FetchCartData";
import Image from "next/image";
import LoginPage from "../login/page";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/constants/UserContext";

const Cart: React.FC = () => {
  // Get cart data from your fetch hook.
  const { cartItems, quantities, setCartItems, setQuantities, loading } =
    useFetchCartData();

  // Get user from context; user being non-null means the user is logged in.
  const { user } = useUserContext();
  const isLoggedIn = Boolean(user);
  const cartCount = cartItems.length;

  const router = useRouter();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Save data in localStorage for checkout.
  const handleCheckoutClick = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("quantities", JSON.stringify(quantities));
  };

  // Reload page after login to refresh cart data.
  const reloading = () => window.location.reload();

  if (loading) {
    return (
      <section className="bg-gray-200 padding-container p-10">
        <div className="flex flex-col w-full items-center max-container padding-container py-10 pb-20 bg-white">
          <p>Loading cart items...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-200 padding-container p-10">
      {isLoggedIn && cartCount > 0 ? (
        <div className="max-container mx-auto">
          {/* Grid layout: left column for cart items and right for summary */}
          <div className="grid md:grid-cols-3 gap-7">
            {/* Left Column: Cart Items */}
            <div className="md:col-span-2 bg-white p-10 rounded-xl">
              <div className="flex justify-between pb-5">
                <span className="text-3xl font-bold">My Cart</span>
                <span className="text-gray-400 text-3xl">({cartCount})</span>
              </div>
              <DisplayCartList
                cartItems={cartItems}
                quantities={quantities}
                setCartItems={setCartItems}
                setQuantities={setQuantities}
              />
            </div>
            {/* Right Column: Summary (Sticky) */}
            <div className="md:col-span-1 relative">
              <div className="sticky top-10">
                <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col space-y-5 items-center">
                  <AmountSummary
                    cartItems={cartItems}
                    quantities={quantities}
                  />
                  <Link href="/checkout" onClick={handleCheckoutClick}>
                    <Button
                      type="button"
                      title="Proceed to Checkout"
                      variant="btn_dark"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // If no cart items (or user not logged in), show an empty cart UI or a login prompt.
        <div className="flex flex-col w-full items-center max-container padding-container py-10 pb-20 bg-white">
          <Image
            src="/emptyCart.jpg"
            alt="empty cart"
            height={400}
            width={400}
          />
          {isLoggedIn && cartCount === 0 ? (
            <div className="flex flex-col w-full items-center space-y-2">
              <h2 className="text-xl">Your cart is empty!</h2>
              <p className="text-sm">Add items to it now.</p>
              <Link href="/product">
                <Button type="button" title="Shop Now" variant="btn_dark" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col w-full items-center space-y-2">
              <h2 className="text-xl">Missing Cart items?</h2>
              <p className="text-sm">
                Login to see the items you added previously.
              </p>
              <button
                className="btn_dark rounded-full"
                onClick={() => setShowLoginDialog(true)}
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}
      {showLoginDialog && (
        <LoginPage
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLoginSuccess={() => {
            setShowLoginDialog(false);
            reloading();
          }}
        />
      )}
    </section>
  );
};

export default Cart;
