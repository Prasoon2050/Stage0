"use client";
import React from "react";
import { useUserContext } from "@/constants/UserContext";
import { MapPin, Edit2, Home, Building2 } from "lucide-react";

const ManageAddresses: React.FC = () => {
  const { user, loading } = useUserContext();

  if (loading) {
    return (
      <p className="text-center text-gray-600">
        Loading address details...
      </p>
    );
  }
  if (!user || !user.address || user.address.length === 0) {
    return (
      <p className="text-center text-red-500">
        No addresses available.
      </p>
    );
  }

  // Helper to format a single address object
  const formatAddress = (address: any) => {
    const { street, city, state, zip, country } = address;
    return [street, city, state, zip, country].filter(Boolean).join(", ");
  };

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <MapPin size={32} className="text-indigo-500" /> Manage Addresses
        </h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
          <Edit2 size={18} />
          Edit Addresses
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.address.map((addr, index) => (
          <div
            key={index}
            className="p-4 border-l-4 border-indigo-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition"
          >
            <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
              {index === 0 ? (
                <Home size={16} className="text-indigo-500" />
              ) : (
                <Building2 size={16} className="text-indigo-500" />
              )}
              Address {index + 1}
            </label>
            <p className="text-lg font-semibold text-gray-900">{formatAddress(addr)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageAddresses;
