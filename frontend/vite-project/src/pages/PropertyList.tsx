import React from 'react';
function PropertyList() {
    // TODO: Fetch properties from API
    const properties = [
      { id: 1, title: "Cozy Apartment", price: 250000 },
      { id: 2, title: "Spacious House", price: 500000 },
      { id: 3, title: "Luxury Villa", price: 1000000 },
    ]
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">${property.price.toLocaleString()}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Details</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default PropertyList
  
  