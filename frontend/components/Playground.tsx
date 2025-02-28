"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ImageUploadDialog from "@/components/LeftSide/ImageUpload/ImageUploadDialog";
import * as fabric from "fabric";
import {
  ImagePlus,
  Type,
  Layers,
  Shirt,
  Share2,
  HelpCircle,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// --- @dnd-kit imports ---
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TextUploadDialog from "./LeftSide/TextUpload/TextUploadDialog";
import RightSidebar from "./RightSide/RightSidebar";

/* ------------------
   Override Fabric's toObject to include custom "myId" property
-------------------- */
if (typeof fabric !== "undefined") {
  fabric.Object.prototype.toObject = (function (toObject) {
    return function (this: fabric.Object, propertiesToInclude?: string[]) {
      return toObject.call(this, ["myId"].concat(propertiesToInclude || []));
    };
  })(fabric.Object.prototype.toObject);
}

/* ------------------
   Types & Interfaces
-------------------- */
export interface CanvasElement {
  id: string;
  type: "image" | "text";
  src?: string;
  text?: string;
  fabricObject?: fabric.FabricObject;
}

interface CanvasStates {
  front: any;
  back: any;
}

interface SortableItemProps {
  item: CanvasElement;
  selectedElement: CanvasElement | null;
  onSelect: (id: string) => void;
}

export default function Playground() {
  // T‑shirt customization states
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedMaterial, setSelectedMaterial] = useState("Polyester");
  const [view, setView] = useState<"front" | "back">("front");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showTextDialog, setShowTextDialog] = useState(false);

  // Canvas & layer states
  const [frontElements, setFrontElements] = useState<CanvasElement[]>([]);
  const [backElements, setBackElements] = useState<CanvasElement[]>([]);
  const [canvasStates, setCanvasStates] = useState<CanvasStates>({
    front: null,
    back: null,
  });

  // Currently selected element
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null
  );

  // Fabric.js setup
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstance = useRef<fabric.Canvas | null>(null);

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // T‑shirt customization options
  const sizes = ["Small", "Medium", "Large", "XL"];
  const materials = ["Polyester", "Dri Fit"];

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !canvasInstance.current) {
      canvasInstance.current = new fabric.Canvas(canvasRef.current, {
        width: 180,
        height: 250,
        backgroundColor: "transparent",
      });
    }
  }, []);

  // Determine current elements array and setter based on view
  const currentElements = view === "front" ? frontElements : backElements;
  const setCurrentElements =
    view === "front" ? setFrontElements : setBackElements;

  // Save current canvas state to canvasStates
  const saveCurrentCanvasState = () => {
    if (canvasInstance.current) {
      const json = canvasInstance.current.toJSON(); // "myId" is included via override
      setCanvasStates((prev) => ({
        ...prev,
        [view]: json,
      }));
    }
  };

  // Load canvas state from canvasStates and update currentElements accordingly
  const loadCanvasState = (viewKey: "front" | "back") => {
    if (canvasInstance.current) {
      const canvas = canvasInstance.current;
      // Clear the canvas to prevent duplicates
      canvas.clear();
      canvas.backgroundColor = "transparent";
      const state = canvasStates[viewKey];
      if (state) {
        canvas.loadFromJSON(state, () => {
          canvas.calcOffset();
          canvas.renderAll();
          // After loading, update currentElements based on canvas objects
          const objects = canvas.getObjects();
          const newElements: CanvasElement[] = objects.map((obj) => ({
            id: (obj as any).myId,
            type: obj.type === "image" ? "image" : "text",
            src:
              obj.type === "image" ? (obj as fabric.Image).getSrc() : undefined,
            text: obj.type === "text" ? (obj as fabric.Text).text : undefined,
            fabricObject: obj,
          }));
          if (viewKey === "front") {
            setFrontElements(newElements);
          } else {
            setBackElements(newElements);
          }
        });
      } else {
        canvas.renderAll();
        if (viewKey === "front") {
          setFrontElements([]);
        } else {
          setBackElements([]);
        }
      }
    }
  };

  // When switching views, save current state, update view, then load new state
  const handleViewSwitch = (newView: "front" | "back") => {
    if (newView === view) return;
    saveCurrentCanvasState();
    setView(newView);
    setSelectedElement(null);
  };

  // Load canvas state when view changes
  useEffect(() => {
    loadCanvasState(view);
  }, [view]);

  // Reorder layers when currentElements changes
  useEffect(() => {
    if (!canvasInstance.current) return;
    const canvas = canvasInstance.current;
    // Clear the canvas completely before re-adding objects
    canvas.clear();
    canvas.backgroundColor = "transparent";
    const newOrder = currentElements
      .map((el) => el.fabricObject)
      .filter((obj) => obj !== undefined) as fabric.Object[];

    const reversedOrder = [...newOrder].reverse();
    reversedOrder.forEach((obj) => canvas.remove(obj));
    reversedOrder.forEach((obj) => {
      canvas.add(obj);
      obj.setCoords();
    });

    canvas.calcOffset();
    canvas.renderAll();
  }, [currentElements, view]);

  // Track selection in canvas
  useEffect(() => {
    if (!canvasInstance.current) return;
    const canvas = canvasInstance.current;
    const handleSelect = () => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && (activeObj as any).myId) {
        const found = currentElements.find(
          (el) => el.id === (activeObj as any).myId
        );
        setSelectedElement(found || null);
      }
    };

    const handleClear = () => {
      setSelectedElement(null);
    };

    canvas.on("selection:created", handleSelect);
    canvas.on("selection:updated", handleSelect);
    canvas.on("selection:cleared", handleClear);

    return () => {
      canvas.off("selection:created", handleSelect);
      canvas.off("selection:updated", handleSelect);
      canvas.off("selection:cleared", handleClear);
    };
  }, [currentElements]);

  // Upload & add image to canvas
  const handleNewUpload = (uploadedImage: string | null) => {
    if (!uploadedImage || !canvasInstance.current) return;
    (async () => {
      try {
        const img = await fabric.Image.fromURL(uploadedImage, {
          crossOrigin: "anonymous",
        });
        const id = uuidv4();
        const desiredWidth = 200;
        const scaleFactor = desiredWidth / (img.width || 1);
        img.set({
          left: 50,
          top: 50,
          scaleX: scaleFactor,
          scaleY: scaleFactor,
          selectable: true,
        });
        (img as any).myId = id;
        if (canvasInstance.current) {
          canvasInstance.current.add(img);
          canvasInstance.current.renderAll();
        }

        const newElement: CanvasElement = {
          id,
          type: "image",
          src: uploadedImage,
          fabricObject: img,
        };
        setCurrentElements((prev) => [newElement, ...prev]);
        setSelectedElement(newElement);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    })();
  };

  const handleNewText = (uploadedText: string | null) => {
    if (!uploadedText || !canvasInstance.current) return;
    const id = uuidv4();
    const fabricText = new fabric.Text(uploadedText, {
      left: 50,
      top: 50,
      fill: "black",
      fontSize: 20,
      selectable: true,
    });
    (fabricText as any).myId = id;
    canvasInstance.current.add(fabricText);
    canvasInstance.current.renderAll();

    const newElement: CanvasElement = {
      id,
      type: "text",
      text: uploadedText,
      fabricObject: fabricText,
    };
    setCurrentElements((prev) => [newElement, ...prev]);
    setSelectedElement(newElement);
  };

  // Layers panel: select layer from list
  const handleSelectLayer = (layerId: string) => {
    const layer = currentElements.find((el) => el.id === layerId);
    if (layer && layer.fabricObject && canvasInstance.current) {
      canvasInstance.current.setActiveObject(layer.fabricObject);
      layer.fabricObject.setCoords();
      canvasInstance.current.calcOffset();
      canvasInstance.current.renderAll();
      setSelectedElement(layer);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = currentElements.findIndex((el) => el.id === active.id);
    const newIndex = currentElements.findIndex((el) => el.id === over.id);
    const reordered = arrayMove(currentElements, oldIndex, newIndex);
    setCurrentElements(reordered);
  };

  // Sortable item for layer list
  function SortableItem({
    item,
    selectedElement,
    onSelect,
  }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.id });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: "pointer",
      border:
        item.id === selectedElement?.id
          ? "2px solid #10B981"
          : "1px solid #e5e7eb",
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => onSelect(item.id)}
        className="flex items-center justify-center p-2 bg-white rounded shadow-sm"
      >
        <div className="relative w-10 h-10">
          {item.type === "image" && item.src ? (
            <Image
              src={item.src}
              alt="Image Layer"
              fill
              className="object-cover rounded"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700 p-1 text-center">
              <span className="text-xs">
                {item.text?.slice(0, 5) ?? "Text"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // RightSidebar actions
  const handleDeleteSelected = () => {
    if (!selectedElement || !canvasInstance.current) return;
    if (selectedElement.fabricObject) {
      canvasInstance.current.remove(selectedElement.fabricObject);
    }
    setCurrentElements((prev) =>
      prev.filter((el) => el.id !== selectedElement.id)
    );
    setSelectedElement(null);
  };

  const handleDuplicateSelected = () => {
    if (!selectedElement || !canvasInstance.current) return;
    const canvas = canvasInstance.current;
    const newId = uuidv4();

    if (selectedElement.type === "image") {
      const originalImg = selectedElement.fabricObject as fabric.Image;
      const imgEl = originalImg.getElement();
      const newImg = new fabric.Image(imgEl, {
        left: (originalImg.left ?? 0) + 20,
        top: (originalImg.top ?? 0) + 20,
        scaleX: originalImg.scaleX,
        scaleY: originalImg.scaleY,
        angle: originalImg.angle,
        flipX: originalImg.flipX,
        flipY: originalImg.flipY,
      });
      (newImg as any).myId = newId;
      canvas.add(newImg);
      canvas.renderAll();

      const newElement: CanvasElement = {
        id: newId,
        type: "image",
        src: selectedElement.src,
        fabricObject: newImg,
      };
      setCurrentElements((prev) => [newElement, ...prev]);
      setSelectedElement(newElement);
    } else if (selectedElement.type === "text") {
      const originalText = selectedElement.fabricObject as fabric.Text;
      const newText = new fabric.Text(originalText.text, {
        left: (originalText.left ?? 0) + 20,
        top: (originalText.top ?? 0) + 20,
        fill: originalText.fill,
        fontSize: originalText.fontSize,
        fontFamily: originalText.fontFamily,
        fontWeight: originalText.fontWeight,
        fontStyle: originalText.fontStyle,
        underline: originalText.underline,
      });
      (newText as any).myId = newId;
      canvas.add(newText);
      canvas.renderAll();

      const newElement: CanvasElement = {
        id: newId,
        type: "text",
        text: originalText.text,
        fabricObject: newText,
      };
      setCurrentElements((prev) => [newElement, ...prev]);
      setSelectedElement(newElement);
    }
  };

  const handleResizeSelected = (
    scaleX?: number,
    scaleY?: number,
    rotation?: number
  ) => {
    if (!selectedElement || !canvasInstance.current) return;
    const canvas = canvasInstance.current;

    if (selectedElement.type === "image") {
      const img = selectedElement.fabricObject as fabric.Image;
      if (scaleX !== undefined) img.scaleX = scaleX;
      if (scaleY !== undefined) img.scaleY = scaleY;
      if (rotation !== undefined) img.angle = rotation;
      img.setCoords();
      canvas.renderAll();
      return;
    }

    if (selectedElement.type === "text" && scaleX) {
      const textObj = selectedElement.fabricObject as fabric.Text;
      textObj.set("fontSize", scaleX);
      textObj.setCoords();
      canvas.renderAll();
      return;
    }

    selectedElement.fabricObject?.scale(1.1);
    selectedElement.fabricObject?.setCoords();
    canvas.renderAll();
  };

  const handleChangeColor = (color: string) => {
    if (!selectedElement || !canvasInstance.current) return;
    if (selectedElement.type === "text") {
      (selectedElement.fabricObject as fabric.Text).set("fill", color);
      selectedElement.fabricObject?.setCoords();
      canvasInstance.current.renderAll();
    }
  };

  const handleEditText = (newText: string) => {
    if (!selectedElement || selectedElement.type !== "text") return;
    (selectedElement.fabricObject as fabric.Text).set("text", newText);
    selectedElement.text = newText;
    selectedElement.fabricObject?.setCoords();
    canvasInstance.current?.renderAll();
  };

  const handleSelectFont = (fontName: string) => {
    if (!selectedElement || selectedElement.type !== "text") return;
    (selectedElement.fabricObject as fabric.Text).set("fontFamily", fontName);
    selectedElement.fabricObject?.setCoords();
    canvasInstance.current?.renderAll();
  };

  const handleToggleBold = () => {
    if (!selectedElement || selectedElement.type !== "text") return;
    const obj = selectedElement.fabricObject as fabric.Text;
    const current = obj.get("fontWeight");
    obj.set("fontWeight", current === "bold" ? "normal" : "bold");
    obj.setCoords();
    canvasInstance.current?.renderAll();
  };

  const handleToggleItalic = () => {
    if (!selectedElement || selectedElement.type !== "text") return;
    const obj = selectedElement.fabricObject as fabric.Text;
    const current = obj.get("fontStyle");
    obj.set("fontStyle", current === "italic" ? "normal" : "italic");
    obj.setCoords();
    canvasInstance.current?.renderAll();
  };

  const handleToggleUnderline = () => {
    if (!selectedElement || selectedElement.type !== "text") return;
    const obj = selectedElement.fabricObject as fabric.Text;
    const current = obj.get("underline");
    obj.set("underline", !current);
    obj.setCoords();
    canvasInstance.current?.renderAll();
  };

  const handlePositionChange = (action: string) => {
    if (!selectedElement || !canvasInstance.current) return;
    const obj = selectedElement.fabricObject as fabric.Object;
    const canvas = canvasInstance.current;

    switch (action) {
      case "alignLeft":
        obj.set({ left: 0 });
        break;
      case "alignRight":
        obj.set({ left: canvas.width! - (obj.width ?? 0) * (obj.scaleX ?? 1) });
        break;
      case "alignTop":
        obj.set({ top: 0 });
        break;
      case "alignBottom":
        obj.set({
          top: canvas.height! - (obj.height ?? 0) * (obj.scaleY ?? 1),
        });
        break;
      case "centerHorizontal":
        canvas.centerObjectH(obj);
        break;
      case "centerVertical":
        canvas.centerObjectV(obj);
        break;
      case "flipHorizontal":
        obj.set("flipX", !obj.get("flipX"));
        break;
      case "flipVertical":
        obj.set("flipY", !obj.get("flipY"));
        break;
      case "rotateLeft":
        obj.rotate((obj.angle ?? 0) - 90);
        break;
      case "rotateRight":
        obj.rotate((obj.angle ?? 0) + 90);
        break;
      default:
        break;
    }
    obj.setCoords();
    canvas.renderAll();
  };

  return (
    <div className="flex max-container padding-container bg-gray-100">
      {/* LEFT SIDEBAR */}
      <div className="flex gap-5">
        <div className="w-20 my-14 bg-white shadow-md flex flex-col items-center p-4 space-y-6 rounded-lg">
          <div className="flex flex-col items-center space-y-6">
            <button
              className="flex flex-col items-center space-y-1"
              onClick={() => setShowUploadPopup(true)}
            >
              <ImagePlus className="w-6 h-6" />
              <span className="text-xs">IMAGE</span>
            </button>
            <button
              className="flex flex-col items-center space-y-1"
              onClick={() => setShowTextDialog(true)}
            >
              <Type className="w-6 h-6" />
              <span className="text-xs">TEXT</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <Layers className="w-6 h-6" />
              <span className="text-xs">DESIGNS</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <Shirt className="w-6 h-6" />
              <span className="text-xs">PRODUCTS</span>
            </button>
          </div>
          <div className="mt-auto flex flex-col items-center space-y-6">
            <button className="flex flex-col items-center space-y-1">
              <Share2 className="w-6 h-6" />
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

        {/* LAYERS PANEL */}
        {currentElements.length > 0 && (
          <div className="w-20 my-14 bg-white shadow-md flex flex-col items-center p-4 rounded-lg">
            <h2 className="font-semibold mb-2">
              Layers ({view === "front" ? "Front" : "Back"})
            </h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={currentElements.map((el) => el.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {currentElements.map((el) => (
                    <SortableItem
                      key={el.id}
                      item={el}
                      selectedElement={selectedElement}
                      onSelect={handleSelectLayer}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      {/* MAIN CONTENT (Canvas Area) */}
      <div className="flex-1 flex flex-col items-center justify-around">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleViewSwitch("front")}
            className={`border-2 p-1 rounded ${
              view === "front" ? "border-green-500" : "border-gray-300"
            }`}
          >
            <Image
              src={`/colours/front${selectedColor}.png`}
              alt="Front View"
              width={50}
              height={50}
            />
          </button>
          <button
            onClick={() => handleViewSwitch("back")}
            className={`border-2 p-1 rounded ${
              view === "back" ? "border-green-500" : "border-gray-300"
            }`}
          >
            <Image
              src={`/colours/back${selectedColor}.png`}
              alt="Back View"
              width={50}
              height={50}
            />
          </button>
        </div>
        <div className="relative w-[450px] h-[400px]">
          <div className="flex w-full h-full">
            <Image
              src={`/colours/${view + selectedColor}.png`}
              alt="T-Shirt"
              width={450}
              height={400}
              className="object-cover bg-none"
            />
          </div>

          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={180}
              height={250}
              className="border-2 border-dotted border-black"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <RightSidebar
        selectedElement={selectedElement}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        materials={materials}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        showSizeChart={showSizeChart}
        setShowSizeChart={setShowSizeChart}
        onDelete={handleDeleteSelected}
        onDuplicate={handleDuplicateSelected}
        onResize={handleResizeSelected}
        onChangeColor={handleChangeColor}
        onEditText={handleEditText}
        onSelectFont={handleSelectFont}
        onToggleBold={handleToggleBold}
        onToggleItalic={handleToggleItalic}
        onToggleUnderline={handleToggleUnderline}
        onPositionChange={handlePositionChange}
      />

      {/* MODALS */}
      {showUploadPopup && (
        <ImageUploadDialog
          open={showUploadPopup}
          onClose={() => setShowUploadPopup(false)}
          setUploadedImage={handleNewUpload}
        />
      )}
      {showTextDialog && (
        <TextUploadDialog
          open={showTextDialog}
          onClose={() => setShowTextDialog(false)}
          setUploadedText={handleNewText}
        />
      )}
    </div>
  );
}
