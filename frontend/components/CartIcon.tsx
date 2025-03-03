"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useUserContext } from "@/constants/UserContext";

const CartIcon: React.FC = () => {
  const { user } = useUserContext();
  // If user or cart is undefined, count is 0; otherwise, it's the length of the cart array.
  const cartCount = user?.cart?.length ?? 0;

  return (
    <Link href="/cart" className="group relative">
      <ShoppingBag className="w-6 h-6 group-hover:text-black hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {cartCount}
      </span>
    </Link>
  );
};

export default CartIcon;
