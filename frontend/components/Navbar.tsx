"use client";
import React, { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Handle authentication state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setShowNavbar(window.scrollY < lastScrollY);
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 shadow-md ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-8">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Image
            src="/menu.svg"
            alt="Menu"
            width={25}
            height={25}
            className="md:hidden cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          <Link href="/">
            <Image
              src="/Tee.png"
              width={150}
              height={100}
              alt="TeeGenius Logo"
            />
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="md:flex hidden gap-5 text-xl font-serif text-gray-700">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className={`hover:text-black hoverEffect ${
                pathname === link.href ? "text-black font-semibold" : ""
              }`}
            >
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>

        {/* Search, Cart, and Authentication Buttons */}
        <div className="flex items-center gap-4">
          <SearchBar />
          <CartIcon />
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button className="btn_dark rounded-full" onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <Link href="/login">
                <Button type="button" title="Login" variant="btn_dark" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 h-screen transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={() => setShowMenu(false)} // Clicking outside closes menu
      >
        <div
          className="fixed inset-y-0 left-0 w-72 bg-white  shadow-lg p-6 transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing menu
        > 
          <Image
              src="/Tee.png"
              width={140}
              height={100}
              alt="TeeGenius Logo"
            />
          <button
            className="absolute top-4 right-4 text-xl"
            onClick={() => setShowMenu(false)}
          >
            ✕
          </button>
          <ul className="flex flex-col gap-6 text-xl font-serif text-gray-900 mt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={`hover:text-black ${
                    pathname === link.href ? "text-black font-semibold" : ""
                  }`}
                  onClick={() => setShowMenu(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <button
                className="btn_dark rounded-full w-full mt-4 py-2"
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
              >
                Log Out
              </button>
            ) : (
              <Link href="/login" onClick={() => setShowMenu(false)}>
                <Button type="button" title="Login" variant="btn_dark" />
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
