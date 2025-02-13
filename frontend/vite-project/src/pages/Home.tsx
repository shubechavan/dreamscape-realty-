"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", searchQuery) // Debug log
    try {
      const response = await axios.get(`http://localhost:3000/api/properties/search?query=${searchQuery}`)
      console.log("Search response:", response.data) // Debug log
      navigate("/search-results", { state: { results: response.data } })
    } catch (error) {
      console.error("Error searching for properties:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-25%20at%2014.54.28_095000ee.jpg-5n0LW6zSKBWevRaBoe6pZPbaYulRYc.jpeg")',
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            Agents. Tours.
            <br />
            Loans. Homes.
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                className="w-full px-6 py-4 text-lg text-gray-900 rounded-lg shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Get home recommendations</h2>
            <p className="text-gray-600 mb-4">Sign in for a more personalized experience.</p>
            <Link
              to="/user/login"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Buy a home */}
            <div className="bg-white rounded-xl shadow-lg p-8 transition duration-300 hover:shadow-xl">
              <div className="w-32 h-32 mb-6 mx-auto">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z3VMXvnobhhiBL6uzb2GuEGgYNfTCR.png"
                  alt="Buy a home"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Buy a home</h3>
              <p className="text-gray-600 text-center mb-6">
                Find your place with an immersive photo experience and the most listings, including things you won't
                find anywhere else.
              </p>
              <Link
                to="/properties"
                className="block text-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Browse homes
              </Link>
            </div>

            {/* Sell a home */}
            <div className="bg-white rounded-xl shadow-lg p-8 transition duration-300 hover:shadow-xl">
              <div className="w-32 h-32 mb-6 mx-auto">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ir9eYQ3b4rJ6lTYjPkmd07qOFgrciQ.png"
                  alt="Sell a home"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Sell a home</h3>
              <p className="text-gray-600 text-center mb-6">
                No matter what path you take to sell your home, we can help you navigate a successful sale.
              </p>
              <Link
                to="/sell"
                className="block text-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                See your options
              </Link>
            </div>

            {/* Rent a home */}
            <div className="bg-white rounded-xl shadow-lg p-8 transition duration-300 hover:shadow-xl">
              <div className="w-32 h-32 mb-6 mx-auto">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xKOv5Nwec7PV3anscoFE88sEIkTFVC.png"
                  alt="Rent a home"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Rent a home</h3>
              <p className="text-gray-600 text-center mb-6">
                We're creating a seamless online experience – from shopping on the largest rental network, to applying,
                to paying rent.
              </p>
              <Link
                to="/rent"
                className="block text-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Find rentals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">About Dreamscape's Recommendations</h2>
            <p className="text-gray-600">
              Recommendations are based on your location and search activity, such as the homes you've viewed and saved
              and the filters you've set. We use this information to bring better homes to your attention, so you don't
              miss out.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

