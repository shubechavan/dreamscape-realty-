"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const RentHome = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")



  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");

        const data = await response.json();
        console.log("Fetched data:", data);
        setProperties(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again later.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Rent a Home</h1>
      {properties.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No rental properties available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={property.image || "https://via.placeholder.com/300x200"}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <p className="text-gray-600 mb-2">{property.description?.substring(0, 100)}...</p>
                <p className="text-blue-600 font-bold mb-2">${property.price}/month</p>
                <Link
                  to={`/property/${property._id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RentHome
