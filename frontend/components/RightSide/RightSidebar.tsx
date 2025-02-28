"use client";

import { useState, useEffect } from "react";
import SizeChart from "@/components/SizeChart";
import { CanvasElement } from "../Playground"; // or from "types.ts"
import {
  Scaling,
  Copy,
  Trash,
  Crop,
  Sparkles,
  Pencil,
  Lock,
  Palette,
  CaseSensitive,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { RgbaColorPicker, RgbaColor } from "react-colorful";

/** Helper to convert RGBA -> Hex. */
function rgbaToHex(r: number, g: number, b: number, a: number) {
  const toHex = (x: number) => x.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

interface RightSidebarProps {
  selectedElement: CanvasElement | null;
  // T-shirt customization props
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  materials: string[];
  selectedMaterial: string;
  setSelectedMaterial: (m: string) => void;
  showSizeChart: boolean;
  setShowSizeChart: (b: boolean) => void;

  // Universal actions
  onDelete: () => void;
  onDuplicate: () => void;
  /** For text: pass a numeric fontSize to resize. For images: do a simple scale or parse numeric param. */
  onResize: (scaleX?: number, scaleY?: number, rotation?: number) => void;
  onChangeColor: (c: string) => void;

  // Additional text-specific handlers
  onEditText?: (newText: string) => void;
  onSelectFont?: (fontName: string) => void;
  onToggleBold?: () => void;
  onToggleItalic?: () => void;
  onToggleUnderline?: () => void;
  onPositionChange?: (action: string) => void;

  // (Optional) lock/unlock function if you want to lock the object
  onLock?: () => void;
}

/** Example fonts for text. Adjust or load real fonts in your project. */
const FONTS = [
  "Arial",
  "Courier",
  "Georgia",
  "Impact",
  "Times New Roman",
  "Verdana",
];

/** Sub-panels for text. */
type TextSubPanel = "" | "color" | "size" | "edit" | "font" | "position";

/** Sub-panels for image. */
type ImageSubPanel = "" | "resize" | "position" | "effects";

export default function RightSidebar({
  selectedElement,
  selectedColor,
  setSelectedColor,
  sizes,
  selectedSize,
  setSelectedSize,
  materials,
  selectedMaterial,
  setSelectedMaterial,
  showSizeChart,
  setShowSizeChart,
  onDelete,
  onDuplicate,
  onResize,
  onChangeColor,
  onEditText,
  onSelectFont,
  onToggleBold,
  onToggleItalic,
  onToggleUnderline,
  onPositionChange,
  onLock,
}: RightSidebarProps) {
  // TEXT sub-panels
  const [textSubPanel, setTextSubPanel] = useState<TextSubPanel>("");

  // IMAGE sub-panels
  const [imageSubPanel, setImageSubPanel] = useState<ImageSubPanel>("");

  // For text color
  const [textRgba, setTextRgba] = useState<RgbaColor>({
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  });

  // For text edit
  const [editValue, setEditValue] = useState("");

  // For text font size
  const [fontSizeValue, setFontSizeValue] = useState(20);

  // For image scale/rotation
  const [imageScaleX, setImageScaleX] = useState(1);
  const [imageScaleY, setImageScaleY] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);

  // --------------------------------------------
  // 1) useEffect: Reset sub-panels on new selection
  // --------------------------------------------
  useEffect(() => {
    // Whenever selectedElement changes, reset sub-panels to default
    setTextSubPanel("");
    setImageSubPanel("");

    if (selectedElement?.type === "image") {
      // Re-initialize scale/rotation to the newly selected image's values
      const img = selectedElement.fabricObject as unknown as fabric.Image;
      setImageScaleX(img.scaleX ?? 1);
      setImageScaleY(img.scaleY ?? 1);
      setImageRotation(img.angle ?? 0);
    } else if (selectedElement?.type === "text") {
      const txt = selectedElement.fabricObject as unknown as fabric.Text;
      setFontSizeValue(txt.fontSize ?? 20);
      // Optionally, you can update textRgba from txt.fill if needed.
    }
  }, [selectedElement]);

  // If no element is selected => default T-shirt panel
  if (!selectedElement) {
    return (
      <div className="w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
        <h2 className="text-xl font-semibold mb-4">Custom Print Options</h2>
        <div className="mb-4">
          <p className="font-medium">Round Neck</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Colour: {selectedColor}</p>
          <div className="flex space-x-2 mt-2">
            {["white", "gray", "blue", "red", "black", "darkgray"].map(
              (color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              )
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="font-medium">Size:</p>
          <div className="flex space-x-2 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`rounded-md p-2 border-2 ${
                  selectedSize === size ? "border-green-500" : "border-gray-300"
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
        <div className="mb-4">
          <p className="font-medium">Material:</p>
          <div className="flex space-x-2 mt-2">
            {materials.map((material) => (
              <button
                key={material}
                className={`rounded p-2 border-2 ${
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
        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-md">
          Add To Cart
        </button>
        {showSizeChart && <SizeChart onClose={() => setShowSizeChart(false)} />}
      </div>
    );
  }

  // ---------------------------------------
  // IMAGE: show a main grid or a sub-panel
  // ---------------------------------------
  if (selectedElement.type === "image") {
    // If no subPanel => show main image options
    if (imageSubPanel === "") {
      return (
        <div className="w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <h2 className="text-xl font-semibold mb-4">Image Options</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Resize => sub-panel */}
            <button
              onClick={() => {
                if (selectedElement && selectedElement.type === "image") {
                  const img =
                    selectedElement.fabricObject as unknown as fabric.Image;

                  setImageScaleX(img.scaleX ?? 1);
                  setImageScaleY(img.scaleY ?? 1);
                  setImageRotation(img.angle ?? 0);
                }
                setImageSubPanel("resize");
              }}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Scaling className="w-6 h-6" />
              <span className="text-xs mt-1">Resize</span>
            </button>

            {/* Position => sub-panel */}
            <button
              onClick={() => setImageSubPanel("position")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Crop className="w-6 h-6" />
              <span className="text-xs mt-1">Position</span>
            </button>

            {/* Effects => sub-panel */}
            <button
              onClick={() => setImageSubPanel("effects")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-xs mt-1">Effects</span>
            </button>

            {/* Duplicate */}
            <button
              onClick={onDuplicate}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Copy className="w-6 h-6" />
              <span className="text-xs mt-1">Duplicate</span>
            </button>

            {/* Lock */}
            <button
              onClick={() => onLock && onLock()}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Lock className="w-6 h-6" />
              <span className="text-xs mt-1">Lock</span>
            </button>

            {/* Delete */}
            <button
              onClick={onDelete}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Trash className="w-6 h-6" />
              <span className="text-xs mt-1">Delete</span>
            </button>
          </div>
        </div>
      );
    }

    // If subPanel === "resize", show sliders for horizontal scale, vertical scale, rotation
    // If subPanel === "resize"
    if (imageSubPanel === "resize") {
      return (
        <div className="w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setImageSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Resize / Rotate</h2>

          {/* Horizontal scale */}
          <div className="flex items-center mb-4">
            <span className="mr-2">↔</span>
            <input
              type="range"
              min={0.01}
              max={2}
              step={0.01}
              value={imageScaleX}
              onChange={(e) => {
                const val = Number(e.target.value);
                setImageScaleX(val);
                onResize(val, imageScaleY, imageRotation);
              }}
              className="flex-1 mr-2"
            />
            <div className="w-10 text-center">{imageScaleX.toFixed(2)}</div>
          </div>

          {/* Vertical scale */}
          <div className="flex items-center mb-4">
            <span className="mr-2">↕</span>
            <input
              type="range"
              min={0.01}
              max={2}
              step={0.01}
              value={imageScaleY}
              onChange={(e) => {
                const val = Number(e.target.value);
                setImageScaleY(val);
                onResize(imageScaleX, val, imageRotation);
              }}
              className="flex-1 mr-2"
            />
            <div className="w-10 text-center">{imageScaleY.toFixed(2)}</div>
          </div>

          {/* Rotation */}
          <div className="flex items-center mb-4">
            <span className="mr-2">↻</span>
            <input
              type="range"
              min={0}
              max={360}
              value={imageRotation}
              onChange={(e) => {
                const val = Number(e.target.value);
                setImageRotation(val);
                onResize(imageScaleX, imageScaleY, val);
              }}
              className="flex-1 mr-2"
            />
            <div className="w-10 text-center">{imageRotation}°</div>
          </div>
        </div>
      );
    }

    // If subPanel === "position"
    if (imageSubPanel === "position" && onPositionChange) {
      return (
        <div className="w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setImageSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Position</h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onPositionChange("alignLeft")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Left
            </button>
            <button
              onClick={() => onPositionChange("alignRight")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Right
            </button>
            <button
              onClick={() => onPositionChange("alignTop")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Top
            </button>
            <button
              onClick={() => onPositionChange("alignBottom")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Bottom
            </button>
            <button
              onClick={() => onPositionChange("centerHorizontal")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Center Horizontal
            </button>
            <button
              onClick={() => onPositionChange("centerVertical")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Center Vertical
            </button>
            <button
              onClick={() => onPositionChange("flipHorizontal")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Flip Horizontal
            </button>
            <button
              onClick={() => onPositionChange("flipVertical")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Flip Vertical
            </button>
            <button
              onClick={() => onPositionChange("rotateLeft")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Rotate Left 90°
            </button>
            <button
              onClick={() => onPositionChange("rotateRight")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Rotate Right 90°
            </button>
          </div>
        </div>
      );
    }

    // If subPanel === "effects"
    if (imageSubPanel === "effects") {
      return (
        <div className="w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setImageSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Effects / Filters</h2>
          {/* Add your filter sliders or placeholders here */}
          <p className="mb-2">Brightness, Contrast, etc. (placeholder UI)</p>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Apply
          </button>
        </div>
      );
    }
  }

  // ---------------------------------------
  // TEXT: show a main grid or sub-panel
  // ---------------------------------------
  if (selectedElement.type === "text") {
    if (textSubPanel === "") {
      return (
        <div className="relative w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <h2 className="text-xl font-semibold mb-4">Text Options</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* 1) COLOR */}
            <button
              onClick={() => setTextSubPanel("color")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Palette className="w-6 h-6" />
              <span className="text-xs mt-1">Color</span>
            </button>

            {/* 2) SIZE */}
            <button
              onClick={() => setTextSubPanel("size")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Scaling className="w-6 h-6" />
              <span className="text-xs mt-1">Size</span>
            </button>

            {/* 3) DUPLICATE */}
            <button
              onClick={onDuplicate}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Copy className="w-6 h-6" />
              <span className="text-xs mt-1">Duplicate</span>
            </button>

            {/* 4) EDIT */}
            <button
              onClick={() => setTextSubPanel("edit")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Pencil className="w-6 h-6" />
              <span className="text-xs mt-1">Edit</span>
            </button>

            {/* 5) FONT */}
            <button
              onClick={() => setTextSubPanel("font")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <CaseSensitive className="w-6 h-6" />
              <span className="text-xs">Font</span>
            </button>

            {/* 6) BOLD */}
            <button
              onClick={() => onToggleBold && onToggleBold()}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Bold className="w-6 h-6" />
              <span className="text-xs">Bold</span>
            </button>

            {/* 7) ITALIC */}
            <button
              onClick={() => onToggleItalic && onToggleItalic()}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Italic className="w-6 h-6" />
              <span className="text-xs">Italic</span>
            </button>

            {/* 8) UNDERLINE */}
            <button
              onClick={() => onToggleUnderline && onToggleUnderline()}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Underline className="w-6 h-6" />
              <span className="text-xs">Underline</span>
            </button>

            {/* 9) POSITION */}
            <button
              onClick={() => setTextSubPanel("position")}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Crop className="w-6 h-6" />
              <span className="text-xs mt-1">Position</span>
            </button>

            {/* 10) DELETE */}
            <button
              onClick={onDelete}
              className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-100"
            >
              <Trash className="w-6 h-6" />
              <span className="text-xs mt-1">Delete</span>
            </button>
          </div>
        </div>
      );
    }

    // If textSubPanel === "color"
    if (textSubPanel === "color") {
      return (
        <div className="relative w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setTextSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Color</h2>
          <RgbaColorPicker
            color={textRgba}
            onChange={(newColor) => {
              setTextRgba(newColor);
              const hex = rgbaToHex(
                newColor.r,
                newColor.g,
                newColor.b,
                newColor.a
              );
              onChangeColor(hex);
            }}
          />
          <div className="flex flex-wrap mt-4">
            {[
              "#000000",
              "#ffffff",
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
              "#808080",
              "#c0c0c0",
              "#ffa500",
              "#800080",
            ].map((c) => (
              <div
                key={c}
                className="w-6 h-6 m-1 cursor-pointer border"
                style={{ backgroundColor: c }}
                onClick={() => {
                  onChangeColor(c);
                  setTextSubPanel("");
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    // If textSubPanel === "size"
    if (textSubPanel === "size") {
      return (
        <div className="relative w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setTextSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Font Size</h2>
          <div className="flex items-center mb-4">
            <Scaling className="w-6 h-6 mr-2" />
            <input
              type="range"
              min={10}
              max={200}
              value={fontSizeValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setFontSizeValue(val);
                onResize(val);
              }}
              className="flex-1 mr-2"
            />
            <div className="w-12 text-center">{fontSizeValue}px</div>
          </div>
        </div>
      );
    }

    // If textSubPanel === "edit"
    if (textSubPanel === "edit" && onEditText) {
      return (
        <div className="relative w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setTextSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Edit Text</h2>
          <textarea
            className="w-full h-24 p-2 border rounded"
            placeholder="Type new text..."
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setEditValue("")}
              className="text-gray-500 hover:text-black text-sm"
            >
              CLEAR
            </button>
            <button
              onClick={() => {
                onEditText(editValue);
                setTextSubPanel("");
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      );
    }

    // If textSubPanel === "font"
    if (textSubPanel === "font" && onSelectFont) {
      return (
        <div className="relative w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setTextSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Choose Font</h2>
          <div className="flex flex-wrap gap-2">
            {FONTS.map((font) => (
              <button
                key={font}
                onClick={() => {
                  onSelectFont(font);
                  setTextSubPanel("");
                }}
                className="border rounded px-2 py-1 text-sm hover:bg-gray-100"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // If textSubPanel === "position"
    if (textSubPanel === "position" && onPositionChange) {
      return (
        <div className="relative w-96 my-14 bg-white shadow-lg p-6 rounded-lg mr-4">
          <button
            onClick={() => setTextSubPanel("")}
            className="text-blue-500 mb-2"
          >
            &larr; BACK
          </button>
          <h2 className="text-xl font-semibold mb-4">Position</h2>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onPositionChange("alignLeft")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Left
            </button>
            <button
              onClick={() => onPositionChange("alignRight")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Right
            </button>
            <button
              onClick={() => onPositionChange("alignTop")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Top
            </button>
            <button
              onClick={() => onPositionChange("alignBottom")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Align Bottom
            </button>
            <button
              onClick={() => onPositionChange("centerHorizontal")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Center Horizontal
            </button>
            <button
              onClick={() => onPositionChange("centerVertical")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Center Vertical
            </button>
            <button
              onClick={() => onPositionChange("flipHorizontal")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Flip Horizontal
            </button>
            <button
              onClick={() => onPositionChange("flipVertical")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Flip Vertical
            </button>
            <button
              onClick={() => onPositionChange("rotateLeft")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Rotate Left 90°
            </button>
            <button
              onClick={() => onPositionChange("rotateRight")}
              className="text-left hover:bg-gray-100 p-2 rounded"
            >
              Rotate Right 90°
            </button>
          </div>
        </div>
      );
    }
  }

  return null;
}
