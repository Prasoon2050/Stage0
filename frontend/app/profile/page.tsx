"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Settings,
  ShoppingBag,
  Layout,
  CreditCard,
  Shield,
  Bell,
  Github,
} from "lucide-react";

export default function ProfilePage() {
  // Define the tabs and include an icon for each
  const tabs = [
    { key: "personal", label: "Personal Info", icon: <User size={16} /> },
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

  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 pr-0 md:pr-4 mb-6 md:mb-0">
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex flex-col items-center">
                <Image
                  src="/avatar-placeholder.png"
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.key}>
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
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            {/* Personal Info */}
            {activeTab === "personal" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">Full Name</label>
                    <p>John Doe</p>
                  </div>
                  <div>
                    <label className="block font-medium">Username</label>
                    <p>johndoe</p>
                  </div>
                  <div>
                    <label className="block font-medium">Email</label>
                    <p>john.doe@example.com</p>
                  </div>
                  <div>
                    <label className="block font-medium">Phone</label>
                    <p>(123) 456-7890</p>
                  </div>
                  <div>
                    <label className="block font-medium">Date of Birth</label>
                    <p>January 1, 1990</p>
                  </div>
                  <div>
                    <label className="block font-medium">Gender</label>
                    <p>Male</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium">Address</label>
                    <p>123 Main St, Springfield, USA</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit Profile
                  </button>
                </div>
              </section>
            )}

            {/* Account Settings */}
            {activeTab === "settings" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Account Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Change Password
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Notification Preferences
                    </h3>
                    <p>
                      Manage your email, SMS, and push notifications for order
                      updates and promotions.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                      Edit Preferences
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Privacy Settings</h3>
                    <p>
                      Control what information is public and manage data
                      sharing.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                      Update Privacy
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Order History */}
            {activeTab === "orders" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Order History</h2>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">#123456</td>
                      <td className="px-4 py-2">2025-01-15</td>
                      <td className="px-4 py-2">Shipped</td>
                      <td className="px-4 py-2">$99.99</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-500 underline">
                          View
                        </button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">#123457</td>
                      <td className="px-4 py-2">2025-02-10</td>
                      <td className="px-4 py-2">Processing</td>
                      <td className="px-4 py-2">$49.99</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-500 underline">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            )}

            {/* Saved Designs */}
            {activeTab === "designs" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Saved Designs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src="/design1.png"
                      alt="Design 1"
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Classic Tee</h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 underline text-sm">
                          Edit
                        </button>
                        <button className="text-red-500 underline text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src="/design2.png"
                      alt="Design 2"
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Modern Vibe</h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 underline text-sm">
                          Edit
                        </button>
                        <button className="text-red-500 underline text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Add more design cards as needed */}
                </div>
              </section>
            )}

            {/* Payment & Shipping */}
            {activeTab === "payment" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Payment & Shipping
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Payment Methods</h3>
                    <div className="border p-4 rounded-lg">
                      <p className="font-medium">Visa ending in 1234</p>
                      <button className="text-blue-500 underline text-sm mt-2">
                        Manage Payment Methods
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Shipping Addresses</h3>
                    <div className="border p-4 rounded-lg">
                      <p className="font-medium">
                        123 Main St, Springfield, USA
                      </p>
                      <button className="text-blue-500 underline text-sm mt-2">
                        Manage Addresses
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Security</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">
                      Two-Factor Authentication
                    </h3>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Enable 2FA
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Login History</h3>
                    <p>Last login: 2025-02-28 14:35</p>
                    <button className="text-blue-500 underline text-sm">
                      View All
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="border p-4 rounded-lg">
                    <p className="font-medium">Order Shipped</p>
                    <p className="text-gray-600 text-sm">
                      Your order #123456 has been shipped.
                    </p>
                    <p className="text-gray-400 text-xs">2 hours ago</p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <p className="font-medium">New Message</p>
                    <p className="text-gray-600 text-sm">
                      You have received a new message from support.
                    </p>
                    <p className="text-gray-400 text-xs">1 day ago</p>
                  </div>
                  {/* Add more notifications as needed */}
                </div>
              </section>
            )}

            {/* Social & Connections */}
            {activeTab === "social" && (
              <section className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Social & Connections
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Connected Accounts</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/facebook.png"
                          alt="Facebook"
                          width={32}
                          height={32}
                        />
                        <span>Facebook</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/google.png"
                          alt="Google"
                          width={32}
                          height={32}
                        />
                        <span>Google</span>
                      </div>
                      {/* More connected accounts */}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Social Activity</h3>
                    <p className="text-gray-600">
                      Share your designs, follow other users, and get inspired!
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                      Connect More Accounts
                    </button>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
