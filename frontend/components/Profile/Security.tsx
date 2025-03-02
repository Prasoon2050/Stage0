"use client";
import React from "react";
import {
  ShieldCheck,
  Clock,
  Laptop,
  Smartphone,
  Key,
  Eye,
  LogOut,
} from "lucide-react";

const Security = () => {
  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
          <ShieldCheck size={32} className="text-blue-500" />
          Security & Privacy
        </h2>
      </div>

      {/* Security Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Two-Factor Authentication */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck size={24} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Two-Factor Authentication
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Enhance security by adding an extra layer of authentication.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition">
            Enable 2FA
          </button>
        </div>

        {/* Password Management */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-3">
            <Key size={24} className="text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Change Password
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Update your password regularly to keep your account secure.
          </p>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md shadow-md hover:bg-orange-600 transition">
            Change Password
          </button>
        </div>

        {/* Active Devices */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <Laptop size={24} className="text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Authorized Devices
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Manage devices that have access to your account.
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
              <div className="flex items-center space-x-2">
                <Smartphone size={20} className="text-gray-500" />
                <span className="text-sm">iPhone 14 - Last used: Feb 28</span>
              </div>
              <button className="text-red-500 text-xs hover:underline">
                Remove
              </button>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
              <div className="flex items-center space-x-2">
                <Laptop size={20} className="text-gray-500" />
                <span className="text-sm">MacBook Pro - Last used: Feb 25</span>
              </div>
              <button className="text-red-500 text-xs hover:underline">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Recent Logins */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-3">
            <Clock size={24} className="text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Login Activity
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Last login: <span className="font-medium">Feb 28, 2025 - 14:35</span>
          </p>
          <button className="text-blue-500 text-sm hover:underline">
            View All
          </button>
        </div>

        {/* Logout All Sessions */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-red-500 md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <LogOut size={24} className="text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Log Out of All Devices
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            If you suspect unauthorized access, log out from all sessions.
          </p>
          <button className="w-full bg-red-500 text-white py-2 rounded-md shadow-md hover:bg-red-600 transition">
            Logout All Sessions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Security;
