import React, { useState } from "react";
import axios from "axios";

interface AddAddressProps {
  onAddressAdded: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ onAddressAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-address",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        onAddressAdded();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Adding Address error:", error);
      alert("Failed to add address");
    }
  };

  return (
    <div>
      <div
        className="text-blue-800 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add delivery address
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <span
              className="text-gray-600 cursor-pointer float-right"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Street:</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">City:</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">State:</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Zip:</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country:</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="w-full btn_dark text-white py-2 rounded"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
