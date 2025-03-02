import Image from "next/image";
import React from "react";

const SavedDesigns = () => {
  const designs = [
    { id: 1, src: "/design1.png", title: "Classic Tee" },
    { id: 2, src: "/design2.png", title: "Modern Vibe" },
    { id: 3, src: "/design3.png", title: "Streetwear Style" },
    { id: 4, src: "/design4.png", title: "Minimalist Art" },
  ];

  return (
    <section className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Saved Designs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200"
          >
            <Image
              src={design.src}
              alt={design.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {design.title}
              </h3>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:underline font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:underline font-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedDesigns;
