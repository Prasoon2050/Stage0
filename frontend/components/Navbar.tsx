"use client";
import React, { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        if (window.scrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300  ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between md:items-center  px-8">
        <div className="flex gap-4 ">
          <Image
            src="/menu.svg"
            alt=""
            width={25}
            height={25}
            className="md:hidden"
            onClick={toggleMenu}
          />
          <Link href="/">
            <Image src="/Tee.png" width={150} height={100} alt="Website logo" />
          </Link>
        </div>
        <ul className="md:flex hidden gap-5 text-xl capitalize font-serif text-gray-50">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className={`hover:text-black hoverEffect ${
                pathname === link.href && "text-black"
              } `}
            >
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-4 justify-center">
          <SearchBar />
          <CartIcon />
          <div className="md:flex hidden">
            {isLoggedIn ? (
              <button
                className="items-center justify-center rounded-full btn_dark "
                onClick={() => handleLogout()}
              >
                LogOut
              </button>
            ) : (
              <Link href="/login">
                <Button
                  type="button"
                  title="Login"
                  variant="btn_dark"
                  icon=""
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu Icon for Small and Medium Devices */}
      <div className="md:hidden left-0 z-0 shadow-xl hoverEffect fixed w-full">
        {showMenu && (
          <div className=" min-w-72 max-w-96 bg-white h-full p-10 border-r">
            <ul className="flex flex-col space-y-2 pb-20 text-xl text-gray-20 font-serif h-screen">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={`hoverEffect hover:text-black ${
                      pathname === link.href && "text-2xl text-black"
                    } `}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isLoggedIn ? (
                <div className="flex justify-center">
                  <button
                    className="rounded-full border btn_dark"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    LogOut
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={toggleMenu}>
                  <Button
                    type="button"
                    title="Login"
                    variant="btn_dark"
                    icon=""
                  />
                </Link>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
