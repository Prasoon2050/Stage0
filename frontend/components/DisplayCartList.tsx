"use client";
import React from "react";
import Image from "next/image";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface DisplayCartListProps {
  cartItems: CartItem[];
  quantities: Record<string, number>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const DisplayCartList: React.FC<DisplayCartListProps> = ({
  cartItems,
  quantities,
  setCartItems,
  setQuantities,
}) => {
  const handleIncrement = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/cart/increment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setQuantities((prev) => ({
          ...prev,
          [id]: (prev[id] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrement = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/cart/decrement/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setQuantities((prev) => ({
          ...prev,
          [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete item from cart");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-white">
      {cartItems.map((item) => (
        <div key={item._id} className="flex rounded-lg shadow-md">
          <div className="flex">
            <Image
              src={item.imageUrl[0]}
              width={100}
              height={100}
              alt={item.name}
              className="rounded"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full px-5">
            <div className="flex flex-col justify-center">
              <h2 className="bold-20">{item.name}</h2>
              <p className="regular-16">Rs {item.price}</p>
            </div>
            <div className="flex items-center mt-2">
              <button
                onClick={() => handleDecrement(item._id)}
                className="w-16 p-2 border border-black text-center rounded-l-3xl"
              >
                -
              </button>
              <span className="w-16 p-2 border border-black text-center">
                {quantities[item._id] ?? 1}
              </span>
              <button
                onClick={() => handleIncrement(item._id)}
                className="w-16 p-2 border border-black text-center rounded-r-3xl"
              >
                +
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="ml-3 p-2 text-red-500 border border-red-500 rounded-full"
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCartList;
