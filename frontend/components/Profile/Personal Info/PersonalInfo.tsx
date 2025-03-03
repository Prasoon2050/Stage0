"use client";
import React from "react";
import { useUserContext } from "@/constants/UserContext";
import FAQSection from "./FAQSection";
import {
  Edit2,
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  UserCircle,
} from "lucide-react";

const PersonalInfo: React.FC = () => {
  const { user, loading } = useUserContext();

  if (loading) {
    return (
      <p className="text-center text-gray-600">
        Loading personal information...
      </p>
    );
  }
  if (!user) {
    return <p className="text-center text-red-500">User data not available.</p>;
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
          <UserCircle size={32} className="text-blue-500" /> Personal
          Information
        </h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          <Edit2 size={18} />
          Edit Profile
        </button>
      </div>

      {/* User Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="p-4 border-l-4 border-blue-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <User size={16} className="text-blue-500" /> Full Name
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"}
          </p>
        </div>

        {/* Username */}
        <div className="p-4 border-l-4 border-green-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <User size={16} className="text-green-500" /> Username
          </label>
          <p className="text-lg font-semibold text-gray-900">{user.username}</p>
        </div>

        {/* Email */}
        <div className="p-4 border-l-4 border-red-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <Mail size={16} className="text-red-500" /> Email
          </label>
          <p className="text-lg font-semibold text-gray-900">{user.email}</p>
        </div>

        {/* Phone */}
        <div className="p-4 border-l-4 border-purple-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <Phone size={16} className="text-purple-500" /> Phone
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {user.phone || "N/A"}
          </p>
        </div>

        {/* Date of Birth */}
        <div className="p-4 border-l-4 border-orange-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <Calendar size={16} className="text-orange-500" /> Date of Birth
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {user.dateOfBirth || "N/A"}
          </p>
        </div>

        {/* Gender */}
        <div className="p-4 border-l-4 border-yellow-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <User size={16} className="text-yellow-500" /> Gender
          </label>
          <p className="text-lg font-semibold text-gray-900">
            {user.gender || "N/A"}
          </p>
        </div>

        {/* Addresses */}
        <div className="p-4 border-l-4 border-indigo-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition md:col-span-2">
          <label className=" text-gray-600 text-sm font-medium flex items-center gap-2">
            <MapPin size={16} className="text-indigo-500" /> Addresses
          </label>
          {user.address && user.address.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 text-lg font-semibold text-gray-900">
              {user.address.map((addr, index) => (
                <li key={index}>{formatAddress(addr)}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg font-semibold text-gray-900">N/A</p>
          )}
        </div>
      </div>

      <FAQSection />
    </section>
  );
};

export default PersonalInfo;
