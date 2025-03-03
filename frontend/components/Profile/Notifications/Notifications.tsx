import React, { useState } from "react";
import { Bell, Mail, Smartphone, Globe, MessageCircle } from "lucide-react";
import NotificationSettingsPopup from "./NotificationSettingsPopup";

const Notifications = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const notifications = [
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #123456 has been shipped.",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "New Message",
      message: "You have received a new message from support.",
      date: "1 day ago",
    },
  ];

  const notificationMethods = [
    { id: "desktop", name: "Desktop Notifications", icon: <Globe size={18} /> },
    { id: "inApp", name: "In-App Notifications", icon: <Bell size={18} /> },
    { id: "sms", name: "SMS", icon: <Smartphone size={18} /> },
    { id: "email", name: "Email", icon: <Mail size={18} /> },
    { id: "whatsapp", name: "WhatsApp", icon: <MessageCircle size={18} /> },
  ];

  const handleOpenPopup = (method: string) => {
    setSelectedMethod(method); // Set the selected method
    setPopupOpen(true); // Ensure popup opens
  };

  return (
    <div className="grid grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg shadow-lg">
      {/* Left Panel - Notifications List */}
      <section className="col-span-2 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="border p-4 rounded-lg bg-gray-100">
              <p className="font-medium">{notif.title}</p>
              <p className="text-gray-600 text-sm">{notif.message}</p>
              <p className="text-gray-400 text-xs">{notif.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Right Panel - Notification Methods */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Notification Methods</h2>
        <div className="space-y-3">
          {notificationMethods.map((method) => (
            <button
              key={method.id}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition"
              onClick={() => handleOpenPopup(method.name)} // ✅ Use handleOpenPopup
            >
              {method.icon}
              {method.name}
            </button>
          ))}
        </div>
      </section>

      {/* Popup for Notification Settings */}
      {selectedMethod && (
        <NotificationSettingsPopup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          method={selectedMethod || "Unknown"} // Provide a default value
        />
      )}
    </div>
  );
};

export default Notifications;
