"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import Button from "@/components/Button";
import Image from "next/image";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginPage({
  open,
  onClose,
}:LoginDialogProps){
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      window.location.href = "/product";
    }
  }, [token]);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/signup";
      const response = await axios.post(url, formData);

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token:", token);
        window.location.reload();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-5xl w-3/4 h-5/6 p-0 rounded-lg">
      <div className="relative shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <Image
          src="/Background3.gif"
          layout="fill"
          objectFit="cover"
          alt="background"
          className="flex -z-10"
        />
        <div className="bg-transparent backdrop-blur-sm relative w-full md:w-1/2 hidden md:block">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/Tee.png"
              alt="Website logo"
              height={800}
              width={800}
              objectFit="contain"
              className=""
            />
          </div>
        </div>
        <div className="bg-transparent backdrop-blur-sm md:backdrop-blur-2xl w-full h-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <div className="flex flex-col">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="firstName">firstName</label>
                  <input
                    type="firstName"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName">lastName</label>
                  <input
                    type="lastName"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
              />
            </div>

            <Button
              type="submit"
              title={isLogin ? "Login" : "Sign Up"}
              variant="btn_dark"
              icon=""
            />
          </form>
          <p
            className="mt-4 cursor-pointer text-blue-500 hover:underline"
            onClick={handleToggleForm}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </DialogContent>
    </Dialog>
  );
};
