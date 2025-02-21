"use client";
import { useState, useRef } from "react";
import { X, Upload, Sparkles, Brush, Globe, QrCode } from "lucide-react";

export default function UploadOptions({ onClose }: { onClose: () => void }) {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div ref={popupRef} className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4 border border-orange-400">
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Your Picture</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Upload Options */}
        <div className="grid grid-cols-2 gap-3">
          <button className="col-span-2 flex items-center justify-center p-3 border rounded-md hover:bg-gray-100 border-orange-400">
            <Upload className="w-5 h-5 mr-2" />
            Upload from Device
          </button>
          <button className="flex items-center justify-center p-3 border rounded-md hover:bg-gray-100 border-orange-400">
            <Sparkles className="w-5 h-5 mr-2" />
            AI Image
          </button>
          <button className="flex items-center justify-center p-3 border rounded-md hover:bg-gray-100 border-orange-400">
            <Brush className="w-5 h-5 mr-2" />
            View Designs
          </button>
          <button className="flex items-center justify-center p-3 border rounded-md hover:bg-gray-100 border-orange-400">
            <Globe className="w-5 h-5 mr-2" />
            Search Web
          </button>
          <button className="flex items-center justify-center p-3 border rounded-md hover:bg-gray-100 border-orange-400">
            <QrCode className="w-5 h-5 mr-2" />
            Add QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
