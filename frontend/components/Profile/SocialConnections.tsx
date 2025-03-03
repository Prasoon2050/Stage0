"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Link2,
  PlusCircle,
} from "lucide-react"; // ✅ Correct import

const SocialConnections = () => {
  const socialAccounts = [
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook size={18} className="text-blue-500" />,
      color: "border-blue-500",
      connected: true,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram size={18} className="text-red-500" />,
      color: "border-red-500",
      connected: true,
    },
  ];

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <Link2 size={32} className="text-indigo-500" /> Social & Connections
        </h2>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialAccounts.map((account) => (
          <div
            key={account.id}
            className={`p-4 border-l-4 ${account.color} rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition`}
          >
            <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
              {account.icon}
              {account.name}
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {account.connected ? "Connected" : "Not Connected"}
            </p>
            <button
              className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${
                account.connected
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {account.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>

      {/* Connect More */}
      <div className="p-4 border-l-4 border-green-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
        <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
          <PlusCircle size={18} className="text-green-500" /> Connect More Accounts
        </label>
        <p className="text-lg font-semibold text-gray-900">
          Link additional accounts to personalize your experience.
        </p>
        <button className="mt-3 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
          <PlusCircle size={18} />
          Connect Account
        </button>
      </div>
    </section>
  );
};

export default SocialConnections;
