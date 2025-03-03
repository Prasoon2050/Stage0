"use client";
import React from "react";
import { useUserContext } from "@/constants/UserContext";
import { User } from "lucide-react";

const LoggedAccount: React.FC = () => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      {/* Header with step label, check icon and the "CHANGE" button at the top right */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <User size={32} className="text-indigo-500" />
          Login
        </h2>
        <button
          onClick={() => console.log("Change account clicked")}
          className="text-indigo-600 hover:text-indigo-800"
        >
          CHANGE
        </button>
      </div>

      {/* User information displayed in a gray box */}
      <div className="p-4 border-l-4 border-indigo-500 rounded-lg shadow-sm bg-gray-100">
        <p className="text-lg font-semibold text-gray-900">
          {user.username}, {user.email}
        </p>
      </div>
    </section>
  );
};

export default LoggedAccount;
