/*import { Link } from "react-router-dom";
import React from 'react';

function Footer() {
  return (
    <footer className="px-4 pt-12 pb-32 bg-gray-200 border-t border-gray-900">
      <div className="lg:flex lg:justify-evenly">
        <div className="max-w-sm mt-6 text-center lg:mt-0">
          <h6 className="mb-4 text-4xl font-semibold text-gray-700"> Dreamscape Realty</h6>
          <p>
            Dreamscape Realty is your trusted partner in finding the perfect home. Whether you're looking to buy or rent, we provide a wide range of properties to suit every need and budget. Our expert agents are here to guide you through every step of the process, ensuring a smooth and hassle-free experience.
          </p>
        </div>
        <div className="mt-6 text-center lg:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700">Quick links</h6>
          <ul>
            <li>
              <Link to="/" className="block py-2 text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 text-gray-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-6 text-center lg:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700">Quick links</h6>
          <ul>
            <li>
              <Link to="/properties" className="block py-2 text-gray-600">
                Property
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/help" className="block py-2 text-gray-600">
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-6 text-center lg:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700">Quick links</h6>
          <ul>
            <li>
              <Link to="/faq" className="block py-2 text-gray-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/new-property" className="block py-2 text-gray-600">
                New Property
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
*/
import { Link } from "react-router-dom";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B92T7tNPW4iifuSrmEGQwiJnnIV0dY.png"
          alt="Dreamscape Realty Footer Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative px-4 pt-16 pb-24 mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">Dreamscape Realty</h2>
            <p className="leading-relaxed">
              Dreamscape Realty is your trusted partner in finding the perfect home. Whether you're looking to buy or
              rent, we provide a wide range of properties to suit every need and budget. Our expert agents are here to
              guide you through every step of the process.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Properties</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 border-t border-gray-700">
          <p className="text-center">
            © {new Date().getFullYear()} Dreamscape Realty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

