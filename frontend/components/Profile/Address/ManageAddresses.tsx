"use client";
import React, { useState } from "react";
import { useUserContext } from "@/constants/UserContext";
import { MapPin, Edit2, Home, Building2, Trash2, PlusCircle } from "lucide-react";
import axios from "axios";
import AddressForm from "./AddressForm";


// Define the Address type
export interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// For new addresses, _id is not available.
export type NewAddress = Omit<Address, "_id">;

// Updated user data interface to include additional properties required by updateUser.
export interface UserData {
  _id: string;
  username: string;
  email: string;
  address: Address[];
  // add other user properties if needed
}

// Define the context type for user information
export interface UserContextType {
  user: UserData | null;
  loading: boolean;
  updateUser: (user: UserData) => void;
}

const ManageAddresses: React.FC = () => {
  // Remove the cast if your context is already typed.
  const { user, loading, updateUser } = useUserContext() as UserContextType;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (loading) {
    return <p className="text-center text-gray-600">Loading address details...</p>;
  }
  if (!user || !user.address || user.address.length === 0) {
    return <p className="text-center text-red-500">No addresses available.</p>;
  }

  const formatAddress = (address: Address): string => {
    return [address.street, address.city, address.state, address.zip, address.country]
      .filter(Boolean)
      .join(", ");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/address/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      updateUser({ ...user, address: user.address.filter((addr) => addr._id !== id) });
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <MapPin size={32} className="text-indigo-500" /> Manage Addresses
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <PlusCircle size={18} /> Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.address.map((addr, index) => (
          <div
            key={addr._id}
            className="p-4 border-l-4 border-indigo-500 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
                {index === 0 ? (
                  <Home size={16} className="text-indigo-500" />
                ) : (
                  <Building2 size={16} className="text-indigo-500" />
                )}{" "}
                Address {index + 1}
              </label>
              <p className="text-lg font-semibold text-gray-900">{formatAddress(addr)}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditAddress(addr)} className="text-blue-500 hover:text-blue-700">
                <Edit2 size={20} />
              </button>
              <button onClick={() => setConfirmDelete(addr._id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Address Modal */}
      {(showModal || editAddress) && (
        <AddressForm closeModal={() => { setShowModal(false); setEditAddress(null); }} editData={editAddress} />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this address?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => handleDelete(confirmDelete)} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Yes, Delete
              </button>
              <button onClick={() => setConfirmDelete(null)} className="bg-gray-300 px-4 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageAddresses;
