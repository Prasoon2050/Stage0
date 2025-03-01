"use client";
import React, { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import LoginPage from "@/app/login/page";
import { User } from "lucide-react";
import { jwtDecode } from "jwt-decode";

// Define a type for user data
interface UserData {
  username: string;
  email: string;
}

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  // dropdownOpen controls visibility; dropdownManual indicates it was toggled via click
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownManual, setDropdownManual] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
  });

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const userIconRef = useRef<HTMLDivElement | null>(null);

  // Handle authentication state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          const decodedToken: { username: string; email: string } =
            jwtDecode(token);
          setUserData({
            username: decodedToken.username,
            email: decodedToken.email,
          });
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        userIconRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !userIconRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setDropdownManual(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, [dropdownOpen]);

  // Combined container for icon and dropdown with delayed onMouseLeave
  const handleContainerMouseLeave = () => {
    // Delay closing to allow moving between icon and dropdown
    setTimeout(() => {
      const isIconHovered = userIconRef.current?.matches(":hover");
      const isDropdownHovered = dropdownRef.current?.matches(":hover");
      if (!isIconHovered && !isDropdownHovered) {
        setDropdownOpen(false);
        setDropdownManual(false);
      }
    }, 200);
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
          {/* Container for user icon and dropdown */}
          <div
            className="hidden md:block relative"
            onMouseLeave={handleContainerMouseLeave}
          >
            <div ref={userIconRef}>
              <User
                onMouseEnter={() => {
                  if (!dropdownManual) setDropdownOpen(true);
                }}
                onClick={() => {
                  // Toggle dropdown on click
                  if (dropdownOpen) {
                    setDropdownOpen(false);
                    setDropdownManual(false);
                  } else {
                    setDropdownOpen(true);
                    setDropdownManual(true);
                  }
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-8 w-56 bg-white shadow-lg rounded-lg z-50 border border-gray-200"
                // Ensure dropdown remains open while hovered
                onMouseEnter={() => setDropdownOpen(true)}
              >
                {/* Dropdown Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/1.webp"
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{userData.username}</h3>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                </div>
                {/* Dropdown Options */}
                <div className="flex flex-col ">
                  <Link href="/profile">
                    <button className="text-left px-4 py-2 w-full hover:bg-gray-100">
                      Profile
                    </button>
                  </Link>
                  <Link href="/orders">
                    <button className="text-left px-4 py-2 w-full hover:bg-gray-100">
                      Order History
                    </button>
                  </Link>
                  <Link href="/my-designs">
                    <button className="text-left px-4 py-2 w-full hover:bg-gray-100">
                      My Designs
                    </button>
                  </Link>
                  <Link href="/settings">
                    <button className="text-left px-4 py-2 w-full hover:bg-gray-100">
                      Account Settings
                    </button>
                  </Link>
                  <Link href="/notifications">
                    <button className="text-left px-4 py-2 w-full hover:bg-gray-100">
                      Notifications
                    </button>
                  </Link>
                </div>
                {/* Dropdown Footer */}
                <div className="border-t border-gray-200">
                  {isLoggedIn ? (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Log Out
                    </button>
                  ) : (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      onClick={() => setShowLoginDialog(true)}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 h-screen transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={() => setShowMenu(false)}
      >
        <div
          className="fixed inset-y-0 left-0 w-72 bg-white shadow-lg p-6 transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src="/Tee.png" width={140} height={100} alt="TeeGenius Logo" />
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
              <button
                className="btn_dark rounded-full w-full mt-4 py-2"
                onClick={() => setShowLoginDialog(true)}
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
      {showLoginDialog && (
        <LoginPage
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
