"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  _id: string;
}

interface UserData {
  address: Address[];
}

const DisplayAddress = () => {
  const [userData, setUserData] = useState<UserData>({
    address: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = () => {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://localhost:5000/api/address", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setUserData((prevData) => ({
                ...prevData,
                address: data,
              }));
              setIsLoggedIn(true);
            } else {
              console.error("Invalid API response format", data);
              setIsLoggedIn(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setIsLoggedIn(false);
          });
      } else {
        router.push("/Login");
        setIsLoggedIn(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleDelete = async (addressId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUserData((prevData) => ({
          ...prevData,
          address: prevData.address.filter((addr) => addr._id !== addressId),
        }));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div>
      <div className="text-black">
        {userData.address.length > 0 ? (
          userData.address.map((addr) => (
            <div
              key={addr._id}
              className="border p-2 mb-2 flex justify-between items-center"
            >
              <div>
                <div>Street: {addr.street}</div>
                <div>City: {addr.city}</div>
                <div>State: {addr.state}</div>
                <div>Zip: {addr.zip}</div>
                <div>Country: {addr.country}</div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(addr._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DisplayAddress;
