"use client";

import { useState } from "react";

const QUOTES = [
  "Be yourself; everyone else is already taken.",
  "In the middle of difficulty lies opportunity.",
  "If you dream it, you can do it.",
  "The secret of getting ahead is getting started.",
];

export default function Quotes({
  setTextValue,
}: {
  setTextValue: (text: string | null) => void;
}) {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleSelect = (quote: string) => {
    setSelectedQuote(quote);
    setTextValue(quote);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Pick a Quote</h2>
      <div className="flex-1 overflow-auto space-y-2">
        {QUOTES.map((quote) => (
          <button
            key={quote}
            onClick={() => handleSelect(quote)}
            className={`w-full text-left p-2 rounded border ${
              selectedQuote === quote
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            {quote}
          </button>
        ))}
      </div>
    </div>
  );
}
