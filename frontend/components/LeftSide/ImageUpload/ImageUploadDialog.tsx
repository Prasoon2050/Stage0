"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud, X, Sparkles, Brush, Globe, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UploadFromDevice from "./UploadFromDevice";

const AIImage = () => <div className="p-6">AI Image Component</div>;
const ViewDesigns = () => <div className="p-6">View Designs Component</div>;
const SearchWeb = () => <div className="p-6">Search Web Component</div>;
const AddQRCode = () => <div className="p-6">Add QR Code Component</div>;

export default function ImageUploadDialog({
  open,
  onClose,
  setUploadedImage,
}: {
  open: boolean;
  onClose: () => void;
  setUploadedImage: (image: string | null) => void;
}) {
  const [selectedOption, setSelectedOption] = useState("upload");
  const [image, setImage] = useState<string | null>(null);

  const options = [
    {
      id: "upload",
      label: "Upload from Device",
      icon: <UploadCloud className="w-5 h-5" />,
      component: <UploadFromDevice setUploadedImage={setImage} />,
    },
    {
      id: "ai",
      label: "AI Image",
      icon: <Sparkles className="w-5 h-5" />,
      component: <AIImage />,
    },
    {
      id: "designs",
      label: "View Designs",
      icon: <Brush className="w-5 h-5" />,
      component: <ViewDesigns />,
    },
    {
      id: "web",
      label: "Search Web",
      icon: <Globe className="w-5 h-5" />,
      component: <SearchWeb />,
    },
    {
      id: "qr",
      label: "Add QR Code",
      icon: <QrCode className="w-5 h-5" />,
      component: <AddQRCode />,
    },
  ];

  const handleValidate = () => {
    if (image) {
      setUploadedImage(image); // Send image to Playground
      onClose(); // Close dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-3/4 p-6 flex">
        {/* Left Sidebar */}
        <div className="w-1/4 border-r pr-4 space-y-4 bg-gray-100">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full text-md font-semibold h-16 flex items-center justify-start border-orange-400"
              onClick={() => setSelectedOption(option.id)}
            >
              {option.icon} {option.label}
            </Button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex-1 pl-4 flex flex-col justify-between">
          <div className=" h-full">
            {options.find((option) => option.id === selectedOption)?.component}
          </div>
          {/* Button always at the bottom */}
          <Button
            onClick={handleValidate}
            disabled={!image}
            className="w-full mt-4"
          >
            Validate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
