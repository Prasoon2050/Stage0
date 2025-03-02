"use client";
import React from "react";
import { Package, Calendar, DollarSign, Eye } from "lucide-react";

const statusColors: Record<string, string> = {
  Shipped: "bg-green-500",
  Processing: "bg-yellow-500",
  Cancelled: "bg-red-500",
};

const OrderHistory: React.FC = () => {
  const orders = [
    {
      id: "#123456",
      date: "2025-01-15",
      status: "Shipped",
      total: "$99.99",
    },
    {
      id: "#123457",
      date: "2025-02-10",
      status: "Processing",
      total: "$49.99",
    },
  ];

  // Status colors
  const statusColors = {
    Shipped: "bg-green-500",
    Processing: "bg-yellow-500",
    Cancelled: "bg-red-500",
  };

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <Package size={32} className="text-blue-500" /> Order History
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="px-6 py-3 text-sm font-semibold">Order ID</th>
      <th className="px-6 py-3 text-sm font-semibold">Date</th>
      <th className="px-6 py-3 text-sm font-semibold text-center">Status</th>
      <th className="px-6 py-3 text-sm font-semibold">Total</th>
      <th className="px-6 py-3 text-sm font-semibold">Details</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order) => (
      <tr key={order.id} className="border-t">
        <td className="px-6 py-4">{order.id}</td>
        <td className="px-6 py-4">{order.date}</td>
        {/* ✅ Center-align the status */}
        <td className="px-6 py-4 text-center">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${
              statusColors[order.status as keyof typeof statusColors] || "bg-gray-500"
            }`}
          >
            {order.status}
          </span>
        </td>
        <td className="px-6 py-4">{order.total}</td>
        <td className="px-6 py-4">
          <button className="text-blue-600 hover:underline">View</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </section>
  );
};

export default OrderHistory;
