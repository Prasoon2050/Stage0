import React from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface AmountSummaryProps {
  cartItems: CartItem[];
  quantities?: Record<string, number>; // Make quantities optional
}

const AmountSummary: React.FC<AmountSummaryProps> = ({
  cartItems,
  quantities,
}) => {
  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = quantities?.[item._id] ?? 1;
    return acc + item.price * quantity;
  }, 0);

  const tax = 50;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col space-y-2 w-full bg-white">
      <h1 className="bold-32 lg:bold-40 pb-5 flex justify-center">Summary</h1>
      <div className="flex justify-between w-full">
        <p>Subtotal</p>
        <p>Rs {subtotal}</p>
      </div>
      <div className="border-t" />
      <div className="flex justify-between w-full">
        <p>Tax</p>
        <p>Rs {tax}</p>
      </div>
      <div className="border-t" />
      <div className="bold-20 lg:text-2xl flex justify-between w-full">
        <h2>Total: Rs {total}</h2>
      </div>
    </div>
  );
};

export default AmountSummary;
