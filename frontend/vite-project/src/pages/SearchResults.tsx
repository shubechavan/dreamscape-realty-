"use client"

import { useLocation, Link } from "react-router-dom"
import React, { useEffect, useState } from "react"

// Interface for Property
interface Property {
  _id: string
  title: string
  description: string
  price: number
  image: string
  address: string
  city: string
  country: string
}

function SearchResults() {
  const location = useLocation()

  // We will use state to handle loading and errors
  const [searchResults, setSearchResults] = useState<Property[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extracting search results from the location state
  useEffect(() => {
    const results = location.state?.results as Property[] | undefined

    if (results) {
      setSearchResults(results)
    } else {
      setError("No properties found matching your search criteria.")
    }
    setIsLoading(false)
  }, [location.state?.results])

  // While data is loading or an error occurs, show a loading indicator or error message
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p>{error}</p>
      </div>
    )
  }

  // If there are no results found
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p>No properties found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((property) => (
          <div key={property._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-2">{property.description.substring(0, 100)}...</p>
              <p className="text-blue-600 font-bold mb-2">${property.price.toLocaleString()}</p>
              <p className="text-gray-600 mb-4">
                {property.address}, {property.city}, {property.country}
              </p>
              <Link
                to={`/property/${property._id}`}
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
