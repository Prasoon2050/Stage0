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
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t bg-gray-100 hover:bg-gray-200 transition"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  {order.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm ${
                      statusColors[order.status as keyof typeof statusColors] ||
                      "bg-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-500" />
                  {order.total}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                    <Eye size={16} />
                    View
                  </button>
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
