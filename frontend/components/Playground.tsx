"use client";
import { useState } from "react";
import Image from "next/image";
import SizeChart from "@/components/SizeChart";
import UploadOptions from "@/components/UploadOptions";
import {
  ImagePlus,
  Type,
  Layers,
  Shirt,
  Share2,
  HelpCircle,
  Link2,
} from "lucide-react";

export default function Playground() {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedMaterial, setSelectedMaterial] = useState("Polyester");
  const [view, setView] = useState("front");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const colors = ["white", "gray", "blue", "red", "black", "darkgray", "green"];
  const sizes = ["Small", "Medium", "Large", "XL"];
  const materials = ["Polyester", "Dri Fit"];

  return (
    <div className="flex max-container padding-container bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 my-14 bg-white shadow-md flex flex-col items-center p-4 space-y-6 rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          <button
            className="flex flex-col items-center space-y-1"
            onClick={() => setShowUploadPopup(true)}
          >
            <ImagePlus className="w-6 h-6" />
            <span className="text-xs">IMAGE</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Layers className="w-6 h-6" />
            <span className="text-xs">DESIGNS</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Type className="w-6 h-6" />
            <span className="text-xs">TEXT</span>
          </button>

          <button className="flex flex-col items-center space-y-1">
            <Shirt className="w-6 h-6" />
            <span className="text-xs ">PRODUCTS</span>
          </button>
        </div>

        <div className="mt-auto space-y-6 flex flex-col items-center">
          <button className="flex flex-col items-center space-y-1">
            <Link2 className="w-6 h-6" />
            <span className="text-xs">Share</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <HelpCircle className="w-6 h-6" />
            <span className="text-xs">Help</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Layers className="w-6 h-6" />
            <span className="text-xs">Large quantities</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-around">
        {/* View Options */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setView("front")}
            className={`border-2 p-1 rounded ${
              view === "front" ? "border-green-500" : "border-gray-300"
            }`}
          >
            <Image
              src={`/colours/front.png`}
              alt="Front View"
              width={50}
              height={50}
            />
          </button>
          <button
            onClick={() => setView("back")}
            className={`border-2 p-1 rounded ${
              view === "back" ? "border-green-500" : "border-gray-300"
            }`}
          >
            <Image
              src={`/colours/back.png`}
              alt="Back View"
              width={50}
              height={50}
            />
          </button>
        </div>
        <div>
          <Image
            src={`/colours/${view}.png`}
            alt="T-Shirt"
            width={450}
            height={400}
          />
        </div>
      </div>

      {/* Customization Panel */}
      <div className="w-96 my-20 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold">
          Men&apos;s T-Shirt Custom print
        </h2>
        <div className="mt-4">
          <p className="font-medium">Round neck</p>
        </div>
        <div className="mt-4">
          <p className="font-medium">Colour: {selectedColor}</p>
          <div className="flex space-x-2 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-medium">Size:</p>
            <div className="flex space-x-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={` rounded-md p-2 border-2 ${
                    selectedSize === size
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSizeChart(true)}
              className="mt-2 text-blue-500 underline"
            >
              Size Chart
            </button>
          </div>
          <div className="mt-4">
            <p className="font-medium">Material:</p>
            <div className="flex space-x-2 mt-2">
              {materials.map((material) => (
                <button
                  key={material}
                  className={` rounded p-2 border-2 ${
                    selectedMaterial === material
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedMaterial(material)}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md w-full">
          Add To Cart
        </button>
      </div>

      {showSizeChart && <SizeChart onClose={() => setShowSizeChart(false)} />}
      {showUploadPopup && <UploadOptions onClose={() => setShowUploadPopup(false)} />}
    </div>
  );
}
