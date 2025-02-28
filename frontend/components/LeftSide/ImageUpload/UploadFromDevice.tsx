import { UploadCloud } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const UploadFromDevice = ({
  setUploadedImage,
}: {
  setUploadedImage: (imageUrl: string) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setPreview(imageUrl);
    }
  };

  // Handle drag & drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setPreview(imageUrl);
    }
  };

  return (
    <div
      className="h-full border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      {preview ? (
        <Image src={preview} alt="Preview Image" height={400} width={400} />
      ) : (
        <>
          <UploadCloud className="w-10 h-10 mb-2" />
          <p className="font-medium">Add your pictures</p>
          <p className="text-sm">Click here or drag and drop your pictures.</p>
        </>
      )}

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadFromDevice;
