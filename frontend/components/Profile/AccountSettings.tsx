"use client";
import React from "react";
import {
  Lock,
  Bell,
  Shield,
  Trash2,
  Settings,
  Edit2,
} from "lucide-react";

const AccountSettings: React.FC = () => {
  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <Settings size={32} className="text-blue-500" /> Account Settings
        </h2>
      </div>

      {/* Settings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Password */}
        <div className="p-4 border-l-4 border-blue-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
            <Lock size={16} className="text-blue-500" /> Change Password
          </label>
          <p className="text-gray-700 text-sm mt-1">
            Secure your account by updating your password regularly.
          </p>
          <button className="mt-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            <Edit2 size={16} />
            Change Password
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="p-4 border-l-4 border-green-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
            <Bell size={16} className="text-green-500" /> Notification Preferences
          </label>
          <p className="text-gray-700 text-sm mt-1">
            Manage email, SMS, and push notifications for order updates and promotions.
          </p>
          <button className="mt-3 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
            <Edit2 size={16} />
            Edit Preferences
          </button>
        </div>

        {/* Privacy Settings */}
        <div className="p-4 border-l-4 border-yellow-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
            <Shield size={16} className="text-yellow-500" /> Privacy Settings
          </label>
          <p className="text-gray-700 text-sm mt-1">
            Control what information is public and manage data sharing.
          </p>
          <button className="mt-3 flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-700 transition">
            <Edit2 size={16} />
            Update Privacy
          </button>
        </div>

        {/* Delete Account */}
        <div className="p-4 border-l-4 border-red-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition">
          <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
            <Trash2 size={16} className="text-red-500" /> Delete Account
          </label>
          <p className="text-gray-700 text-sm mt-1">
            Permanently delete your account and all associated data.
          </p>
          <button className="mt-3 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
            <Trash2 size={16} />
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
