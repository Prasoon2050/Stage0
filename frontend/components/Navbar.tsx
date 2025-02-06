'use client'
import React, { useState, useEffect } from 'react'
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { getLocalStorgeToken } from './getToken'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const token = getLocalStorgeToken();
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex justify-between lg:items-center items-start px-8">
        <div className="flex">
          <Link href="/">
            <Image
              src="/Tee.png"
              width={150}
              height={100}
              alt="Website logo"
            />
          </Link>
        </div>
        <ul className="lg:flex hidden space-x-10 text-xl font-serif">
          {NAV_LINKS.map((link, index) => (
            <Link href={link.href} key={link.key}>
              <li className='transition-all duration-200 hover:text-3xl'>{link.label}</li>
            </Link>
          ))}
        </ul>
        <div className="lg:flex hidden space-x-3">
          {isLoggedIn ? (
            <button
              className="gap-20 items-center justify-center rounded-full border btn_dark"
              onClick={() => handleLogout()}
            >
              LogOut
            </button>
          ) : (
            <Link href="/login">
              <Button type="button" title="Login" variant="btn_dark" icon="" />
            </Link>
          )}
        </div>
        <div className="lg:hidden pt-5" onClick={toggleMenu}>
          <Image src="/menu.svg" alt="" width={32} height={32} />
        </div>
      </div>

      {/* Menu Icon for Small and Medium Devices */}
      <div className="lg:hidden">
        {showMenu && (
          <div>
            <ul className="flex flex-col items-center justify-center space-y-20 pb-20 text-2xl h-screen">
              {NAV_LINKS.map((link) => (
                <li key={link.key} className="mb-2">
                  <Link href={link.href} className="text-2xl transition-all hover:text-4xl" onClick={toggleMenu}>
                    {link.label}
                  </Link> 
                </li>
              ))}
              {isLoggedIn ? (
                <button
                  className="bg-pink-700 px-6 py-2 text-white hover:bg-pink-900 items-center justify-center rounded-full border"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  LogOut
                </button>
              ) : (
                <Link href="/login" onClick={toggleMenu}>
                  <Button type="button" title="Login" variant="btn_2" icon="" />
                </Link>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
