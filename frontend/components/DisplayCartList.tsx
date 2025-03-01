"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";

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
  // Local state for modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

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
          [id]: (prev[id] || 1) + 1,
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
          [id]: Math.max((prev[id] || 1) - 1, 1),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Instead of deleting immediately, we open the modal
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  // If user confirms, proceed with the actual delete
  const handleConfirmRemove = async () => {
    if (!itemToDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/cart/${itemToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete item from cart");
      }
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemToDelete)
      );
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[itemToDelete];
        return newQuantities;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleCancelRemove = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            {/* Product Image */}
            <div className="w-full md:w-1/4 h-32 md:h-36 relative">
              <Image
                src={item.imageUrl[0]}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Product Details & Controls */}
            <div className="w-full md:w-3/4 p-4 flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-lg text-gray-700 mt-1">Rs {item.price}</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                {/* Quantity Controls */}
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-l border-r">
                    {quantities[item._id] ?? 1}
                  </span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="ml-4 flex items-center justify-center p-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm relative shadow-lg">
            <button
              onClick={handleCancelRemove}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Remove Item</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to remove this item from your cart?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelRemove}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayCartList;
