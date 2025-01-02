"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = ["graph", "chat", "profile"];

  const getLinkStyle = (path: string) => {
    const baseStyle = "px-3 py-2 transition-colors duration-200";
    const activeStyle =
      "text-gray-700 hover:text-gray-900 border-b-2 border-gray-300";
    const inactiveStyle = "text-gray-500 hover:text-gray-700";

    return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
  };

  const getMobileLinkStyle = (path: string) => {
    const baseStyle =
      "block px-3 py-2 rounded-md transition-colors duration-200";
    const activeStyle = "text-gray-700 hover:text-gray-900 bg-gray-50";
    const inactiveStyle = "text-gray-500 hover:text-gray-700 hover:bg-gray-50";

    return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
  };

  return (
    <nav className="w-full  bg-white">
      {/* Main navbar container */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo and Desktop Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              {/* Your logo SVG or image */}
              <div className="w-8 h-8 text-gray-300">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 14.5C22 17.5376 19.5376 20 16.5 20C13.4624 20 11 17.5376 11 14.5C11 11.4624 13.4624 9 16.5 9C19.5376 9 22 11.4624 22 14.5Z" />
                  <path d="M13 3.5C13 6.53757 10.5376 9 7.5 9C4.46243 9 2 6.53757 2 3.5C2 0.462432 4.46243 -2 7.5 -2C10.5376 -2 13 0.462432 13 3.5Z" />
                </svg>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-10">
              {navLinks.map((navLink) => (
                <Link
                  key={navLink}
                  href={`/${navLink}`}
                  className={getLinkStyle(`/${navLink}`)}
                >
                  {/* Capitalize the first letter for display */}
                  {navLink.charAt(0).toUpperCase() + navLink.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section: Notification and Profile */}
          <div className="flex items-center">
            <LogoutButton />
            {/* Mobile menu button */}
            <div className="ml-4 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navLinks.map((navLink) => (
              <Link
                key={navLink}
                href={`/${navLink}`}
                className={getMobileLinkStyle(`/${navLink}`)}
              >
                {/* Capitalize the first letter for display */}
                {navLink.charAt(0).toUpperCase() + navLink.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
