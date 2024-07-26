'use client'// components/Navbar.js''
import React, { useState, useEffect } from 'react'
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { getLocalStorgeToken } from './getToken'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getLocalStorgeToken();
    setIsLoggedIn(!!token); // Check if token exists in local storage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-3">
      <Link href="/">
        <Image src="/Tee.png" alt="logo" width={130} height={40} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Link href="/cart">
          <Button 
            type="button"
            title="Cart"
            icon="/cart.svg"
            variant="btn_dark_green"
          />
        </Link>
        {isLoggedIn ? (
            <Button 
            type="button"
            title="LoginOut"
            icon="/user.svg"
            variant="btn_dark_green"
          />
          ) : (
            <Link href="/login">
          <Button 
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
          />
        </Link>
          )}
        
      </div>

      {/* Menu Icon for Small and Medium Devices */}
      <div className="lg:hidden flex items-center">
        <Image 
          src="/menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-full flex justify-center">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.key} className="mb-2">
                  <Link href={link.href} className="text-gray-700 hover:text-gray-900 text-2xl">
                    {link.label}
                  </Link>
                </li>
              ))}
              {isLoggedIn ? (
            <Button 
            type="button"
            title="LoginOut"
            icon="/user.svg"
            variant="btn_dark_green"
          />
          ) : (
            <Link href="/login">
          <Button 
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
          />
        </Link>
          )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
