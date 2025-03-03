"use client";

import Image from "next/image";
import Link from "next/link";
import {
  User,
  Settings,
  ShoppingBag,
  Layout,
  CreditCard,
  Shield,
  Bell,
  Github,
  Locate,
} from "lucide-react";

// Import sub-components
import PersonalInfo from "@/components/Profile/Personal Info/PersonalInfo";
import AccountSettings from "@/components/Profile/AccountSettings";
import OrderHistory from "@/components/Profile/OrderHistory";
import SavedDesigns from "@/components/Profile/SavedDesigns";
import PaymentShipping from "@/components/Profile/PaymentShipping";
import Security from "@/components/Profile/Security";
import Notifications from "@/components/Profile/Notifications/Notifications";
import SocialConnections from "@/components/Profile/SocialConnections";
import { useSearchParams } from "next/navigation";
import { useUserContext } from "@/constants/UserContext";
import { useState } from "react";
import ManageAddresses from "@/components/Profile/Address/ManageAddresses";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Get user data from Context
  const { user, loading } = useUserContext();

  const tabs = [
    { key: "personal", label: "Personal Info", icon: <User size={16} /> },
    { key: "address", label: "Manage Addresses", icon: <Locate size={16} /> },
    {
      key: "settings",
      label: "Account Settings",
      icon: <Settings size={16} />,
    },
    { key: "orders", label: "Order History", icon: <ShoppingBag size={16} /> },
    { key: "designs", label: "Saved Designs", icon: <Layout size={16} /> },
    {
      key: "payment",
      label: "Payment & Shipping",
      icon: <CreditCard size={16} />,
    },
    { key: "security", label: "Security", icon: <Shield size={16} /> },
    { key: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    {
      key: "social",
      label: "Social & Connections",
      icon: <Github size={16} />,
    },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo />;
      case "address":
        return <ManageAddresses />;
      case "settings":
        return <AccountSettings />;
      case "orders":
        return <OrderHistory />;
      case "designs":
        return <SavedDesigns />;
      case "payment":
        return <PaymentShipping />;
      case "security":
        return <Security />;
      case "notifications":
        return <Notifications />;
      case "social":
        return <SocialConnections />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-1/4 pr-0 md:pr-4 mb-6 md:mb-0">
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/1.webp"
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <h2 className="mt-4 text-xl font-semibold">
                  {user?.username || "Loading..."}
                </h2>
                <p className="text-gray-600">{user?.email || "Loading..."}</p>
              </div>
            </div>
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.key}>
                    <Link href={`/profile?tab=${tab.key}`}>
                      <button
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center space-x-2 w-full p-2 rounded transition ${
                          activeTab === tab.key
                            ? "bg-blue-500 text-white"
                            : "text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="w-full md:w-3/4">{renderActiveTab()}</main>
        </div>
      </div>
    </div>
  );
}
