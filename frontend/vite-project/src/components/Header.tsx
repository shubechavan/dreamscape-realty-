/*import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
              alt="Dreamscape Realty Logo"
              className="h-20 w-auto"
            />
            <span className="text-2xl font-semibold text-gray-800">Dreamscape Realty</span>
          </Link>
          <button
            type="button"
            className="md:hidden text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-8`}>
          <Link to="/" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600">
              About Us
            </Link>
          <Link to="/properties" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Properties
          </Link>
          <Link to="/contact" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Contact Us
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            <Link
              to="/user/login"
              className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0"
            >
              User Login
            </Link>
            <Link
              to="/admin/login"
              className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
*/

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import React from "react";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
              alt="Dreamscape Realty Logo"
              className="h-20 w-auto"
            />
            <span className="text-2xl font-semibold text-gray-800">Dreamscape Realty</span>
          </Link>
          <button
            type="button"
            className="md:hidden text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-8`}>
          <Link to="/" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600">
            About Us
          </Link>
          <Link to="/properties" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Properties
          </Link>
          <Link to="/contact" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Contact Us
          </Link>
          {isAuthenticated ? (
            <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
              <Link to="/user/dashboard" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
                Dashboard
              </Link>
              <button onClick={logout} className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
              <Link to="/user/login" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
                Login
              </Link>
              <Link to="/user/register" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

