"use client";
import { useEffect, useState } from "react";

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: Address[];
  dateOfBirth?: string;
  gender?: string;
  // Add other properties as needed.
}

const useFetchUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUserData(null);
          return;
        }
        const response = await fetch("http://localhost:5000/api/user-data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return { userData, setUserData, loading };
};

export default useFetchUserData;
