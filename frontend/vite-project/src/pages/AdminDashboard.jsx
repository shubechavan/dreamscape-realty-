"use client"

import { useState, useEffect } from "react"
import axios from "axios"

function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        const response = await axios.get("/api/admin/property", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProperties(response.data.properties)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch properties. Please try again later.")
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={property.imagelink || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{property.title}</h2>
              <p className="text-gray-600 mb-4">{property.description.substring(0, 100)}...</p>
              <p className="text-blue-600 font-bold text-xl mb-4">${property.price.toLocaleString()}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 transform hover:scale-105">
                Delete Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard

