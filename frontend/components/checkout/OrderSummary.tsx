import React from "react";
import { ShoppingCart } from "lucide-react"; // Using a shopping cart icon for order review
import DisplayCartList from "../DisplayCartList";

interface OrderSummaryProps {
  cartItems: any;
  quantities: any;
  setCartItems: (items: any) => void;
  setQuantities: (quantities: any) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  quantities,
  setCartItems,
  setQuantities,
}) => {
  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      {/* Header with icon and title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <ShoppingCart size={32} className="text-indigo-500" />
          Order Summary
        </h2>
      </div>
      
      {/* Content area for the cart list */}
      <div className="space-y-4">
        <DisplayCartList
          cartItems={cartItems}
          quantities={quantities}
          setCartItems={setCartItems}
          setQuantities={setQuantities}
        />
      </div>
    </section>
  );
};

export default OrderSummary;
