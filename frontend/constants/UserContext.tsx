"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user data
interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: Address[];
  dateOfBirth?: string;
  gender?: string;
}

// Define the context type
interface UserContextType {
  user: UserData | null;
  loading: boolean;
  updateUser: (updatedUser: UserData) => void;
  logout: () => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom Hook to use Context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
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
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
