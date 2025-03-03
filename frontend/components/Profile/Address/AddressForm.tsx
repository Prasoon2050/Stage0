"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useUserContext } from "@/constants/UserContext";
import axios from "axios";
import { Address, NewAddress, UserData } from "./ManageAddresses"; // adjust the import path as needed

interface AddressFormProps {
  closeModal: () => void;
  editData: Address | null;
}

interface UserContextType {
  user: UserData | null;
  updateUser: (user: UserData) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ closeModal, editData }) => {
  const { user, updateUser } = useUserContext() as UserContextType;
  if (!user) return null;

  const [formData, setFormData] = useState<NewAddress | Address>(
    editData ? editData : { street: "", city: "", state: "", zip: "", country: "" }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = editData
        ? `http://localhost:5000/api/address/${editData._id}`
        : "http://localhost:5000/api/add-address";
      const method = editData ? "PUT" : "POST";
      const response = await axios({
        method,
        url,
        data: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200 || response.status === 201) {
        updateUser({
          ...user,
          address: editData
            ? user.address.map((addr) =>
                addr._id === editData._id ? ({ ...formData, _id: editData._id } as Address) : addr
              )
            : [...user.address, response.data],
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Zip"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
