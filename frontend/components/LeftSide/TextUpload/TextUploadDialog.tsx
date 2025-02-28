"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Icons for each option
import { Type, BookOpen } from "lucide-react";
import AddText from "./AddText";
import Quotes from "./Quotes";

// Sub-components (mirroring your approach in ImageUploadDialog)

interface TextUploadDialogProps {
  open: boolean;
  onClose: () => void;
  setUploadedText: (text: string | null) => void;
}

export default function TextUploadDialog({
  open,
  onClose,
  setUploadedText,
}: TextUploadDialogProps) {
  // Track which left-side option is selected
  const [selectedOption, setSelectedOption] = useState("text");

  // The final text value to be passed back to the parent
  const [textValue, setTextValue] = useState<string | null>(null);

  // Define the options similar to your ImageUploadDialog
  const options = [
    {
      id: "text",
      label: "Add Text",
      icon: <Type className="w-5 h-5" />,
      // Sub-component: user can type custom text
      component: <AddText setTextValue={setTextValue} />,
    },
    {
      id: "quotes",
      label: "Quotes",
      icon: <BookOpen className="w-5 h-5" />,
      // Sub-component: user can pick from a set of quotes
      component: <Quotes setTextValue={setTextValue} />,
    },
    // You can add more options here if you like
  ];

  // Validate button: pass textValue to the parent and close
  const handleValidate = () => {
    if (textValue) {
      setUploadedText(textValue);
      onClose();
      setTextValue(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-3/4 p-6 flex ">
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
          {/* Sub-component content */}
          <div className="flex-1">
            {options.find((option) => option.id === selectedOption)?.component}
          </div>

          {/* Validate button at the bottom */}
          <Button
            onClick={handleValidate}
            disabled={!textValue}
            className="w-full mt-4"
          >
            Validate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
