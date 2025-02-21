"use client";
import React from "react";
import Link from "next/link";
import DisplayCartList from "@/components/DisplayCartList";
import AmountSummary from "@/components/AmountSummary";
import Button from "@/components/Button";
import useFetchCartData from "@/components/FetchCartData";

const Cart = () => {
  const { cartItems, quantities, setCartItems, setQuantities, loading } =
    useFetchCartData();

  // Store data in localStorage
  const handleCheckoutClick = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("quantities", JSON.stringify(quantities));
  };

  return (
    <section className="flex flex-col space-x-10 md:flex-row w-full justify-between max-container padding-container py-10 pb-20 bg-gray-200">
      <div className="w-full md:w-2/3">
        <h1 className="bold-32 lg:bold-40 pb-5 flex justify-between">
          <span>My Cart</span>
        </h1>

        {loading ? (
          <p>Loading cart items...</p>
        ) : (
          <DisplayCartList
            cartItems={cartItems}
            quantities={quantities}
            setCartItems={setCartItems}
            setQuantities={setQuantities}
          />
        )}
      </div>

      <div className="mt-10 w-full md:w-1/3">
        <AmountSummary cartItems={cartItems} quantities={quantities} />
        <Link href="/checkout" onClick={handleCheckoutClick}>
          <Button
            type="button"
            title="Proceed to Checkout"
            variant="btn_dark"
          />
        </Link>
      </div>
    </section>
  );
};

export default Cart;
