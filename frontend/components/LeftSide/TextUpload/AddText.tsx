"use client";

import { useState } from "react";

export default function AddText({
  setTextValue,
}: {
  setTextValue: (text: string | null) => void;
}) {
  const [localText, setLocalText] = useState("");

  // Update local state and also pass it up so the parent can track changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalText(e.target.value);
    setTextValue(e.target.value);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Add Custom Text</h2>
      <textarea
        className="flex-1 p-2 border border-gray-300 rounded"
        placeholder="Type your text here..."
        value={localText}
        onChange={handleChange}
      />
    </div>
  );
}
