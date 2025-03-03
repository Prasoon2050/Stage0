"use client";
import React, { useState } from "react";
import { useUserContext } from "@/constants/UserContext";
import { MapPin, Edit2, Home, Building2, PlusCircle } from "lucide-react";
import AddressForm from "../Profile/Address/AddressForm";

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

export interface UserData {
  _id: string;
  username: string;
  email: string;
  address: Address[];
}

export interface UserContextType {
  user: UserData | null;
  loading: boolean;
  updateUser: (user: UserData) => void;
}

const SelectAddress: React.FC = () => {
  const { user, loading } = useUserContext() as UserContextType;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  // Manage showing a single selected address or the full list
  const [showAddressList, setShowAddressList] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    user?.address?.[0]?._id || null
  );

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading address details...</p>
    );
  }
  if (!user || !user.address || user.address.length === 0) {
    return <p className="text-center text-red-500">No addresses available.</p>;
  }

  const formatAddress = (address: Address): string => {
    return [
      address.street,
      address.city,
      address.state,
      address.zip,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // Find the currently selected address
  const selectedAddress = user.address.find(
    (addr) => addr._id === selectedAddressId
  );

  // When user clicks "Deliver Here," we just hide the address list
  const handleDeliverHere = () => {
    setShowAddressList(false);
  };

  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <MapPin size={32} className="text-indigo-500" />
          Delivery Address
        </h2>
        <button
            onClick={() => setShowAddressList(true)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            CHANGE
          </button>
      </div>

      {/* Show only the selected address if not choosing from the list */}
      {!showAddressList && selectedAddress && (
        <div className="p-4 border-l-4 border-indigo-500 rounded-lg shadow-sm bg-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {user.address[0]._id === selectedAddress._id ? (
              <Home size={16} className="text-indigo-500" />
            ) : (
              <Building2 size={16} className="text-indigo-500" />
            )}
            <p className="text-lg font-semibold text-gray-900">
              {formatAddress(selectedAddress)}
            </p>
          </div>
          
        </div>
      )}

      {/* If user clicks "Change," show all addresses to pick from */}
      {showAddressList && (
        <div className="space-y-4">
          {user.address.map((addr, index) => (
            <div
              key={addr._id}
              onClick={() => setSelectedAddressId(addr._id)}
              className="p-4 border-l-4 border-indigo-500 rounded-lg shadow-sm bg-gray-100 hover:cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Radio button (stopping propagation so the parent click doesn't conflict) */}
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === addr._id}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => setSelectedAddressId(addr._id)}
                  />
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    {index === 0 ? (
                      <Home size={16} className="text-indigo-500" />
                    ) : (
                      <Building2 size={16} className="text-indigo-500" />
                    )}
                    <span className="text-lg font-semibold text-gray-900">
                      {formatAddress(addr)}
                    </span>
                  </label>
                </div>
                {/* Edit button aligned to the right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditAddress(addr);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 size={20} />
                </button>
              </div>
              {/* Deliver Here button below the address if this address is selected */}
              {selectedAddressId === addr._id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeliverHere();
                  }}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition mt-4"
                >
                  Deliver Here
                </button>
              )}
            </div>
          ))}

          {/* Add new address at the bottom */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
            >
              <PlusCircle size={18} />
              Add New Address
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Address Modal */}
      {(showModal || editAddress) && (
        <AddressForm
          closeModal={() => {
            setShowModal(false);
            setEditAddress(null);
          }}
          editData={editAddress}
        />
      )}
    </section>
  );
};

export default SelectAddress;
