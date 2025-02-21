"use client";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface SizeChartProps {
  onClose: () => void;
}

export default function SizeChart({ onClose }: SizeChartProps) {
  const [unit, setUnit] = useState("inches");
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeData: { [key: string]: { size: string; chest: number; length: number }[] } = {
    inches: [
      { size: "S", chest: 38, length: 26 },
      { size: "M", chest: 40, length: 27 },
      { size: "L", chest: 42, length: 28 },
      { size: "XL", chest: 44, length: 29 },
      { size: "2XL", chest: 46, length: 30 },
      { size: "3XL", chest: 48, length: 31 },
      { size: "4XL", chest: 50, length: 32 },
      { size: "5XL", chest: 52, length: 33 },
      { size: "6XL", chest: 56, length: 33 },
      { size: "7XL", chest: 60, length: 33 },
    ],
    cm: [
      { size: "S", chest: 96, length: 66 },
      { size: "M", chest: 101, length: 68 },
      { size: "L", chest: 107, length: 71 },
      { size: "XL", chest: 112, length: 74 },
      { size: "2XL", chest: 117, length: 76 },
      { size: "3XL", chest: 122, length: 79 },
      { size: "4XL", chest: 127, length: 81 },
      { size: "5XL", chest: 132, length: 81 },
      { size: "6XL", chest: 142, length: 84 },
      { size: "7XL", chest: 153, length: 84 },
    ],
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="w-6 h-6 text-gray-600 hover:text-black" />
        </button>

        {/* Size Chart */}
        <div className="w-full md:w-1/2 p-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button onClick={() => setUnit("inches")} className={`px-4 py-1 rounded ${unit === "inches" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
              Inches
            </button>
            <button onClick={() => setUnit("cm")} className={`px-4 py-1 rounded ${unit === "cm" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
              Cm
            </button>
          </div>

          <table className="w-full border border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Size</th>
                <th className="border p-2">Chest ({unit === "inches" ? "inches" : "cm"})</th>
                <th className="border p-2">Front Length ({unit === "inches" ? "inches" : "cm"})</th>
              </tr>
            </thead>
            <tbody>
              {sizeData[unit].map(({ size, chest, length }) => (
                <tr key={size} className="text-center">
                  <td className="border p-2">{size}</td>
                  <td className="border p-2">{chest}</td>
                  <td className="border p-2">{length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Size Chart Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <Image src="/colours/sizeChart.jpg" alt="Size Chart" width={350} height={350} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
