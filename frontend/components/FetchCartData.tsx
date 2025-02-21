"use client";
import { useEffect, useState } from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const useFetchCartData = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/cart-list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart items");

        const data: CartItem[] = await response.json();
        const quantities: Record<string, number> = {};

        await Promise.all(
          data.map(async (item) => {
            const res = await fetch(
              `http://localhost:5000/api/cart/quantity/${item._id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              const quantityData = await res.json();
              quantities[item._id] = quantityData.productQuantity;
            }
          })
        );
        setCartItems(data);
        setQuantities(quantities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return { cartItems, quantities, setCartItems, setQuantities, loading };
};

export default useFetchCartData;
