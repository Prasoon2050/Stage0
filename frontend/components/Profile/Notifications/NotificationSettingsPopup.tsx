"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface NotificationSettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  method: string;
}

const NotificationSettingsPopup: React.FC<NotificationSettingsPopupProps> = ({ isOpen, onClose, method }) => {
  const settings = [
    { id: "orders", label: "Order Updates", description: "Get notified about your orders" },
    { id: "reminders", label: "Reminders", description: "Receive reminders for discounts & stock updates" },
    { id: "recommendations", label: "Product Recommendations", description: "Get personalized product suggestions" },
    { id: "offers", label: "New Offers", description: "Receive notifications about new deals and discounts" },
    { id: "reviews", label: "Feedback & Reviews", description: "Be notified about review updates" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {method} Notification Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.id} className="flex justify-between items-center p-3 border-b border-gray-200">
              <div>
                <Label className="text-gray-800 font-medium">{setting.label}</Label>
                <p className="text-gray-500 text-sm">{setting.description}</p>
              </div>
              <Switch />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingsPopup;
