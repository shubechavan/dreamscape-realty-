import React from 'react';
function PurchasedProperties() {
    // TODO: Fetch purchased properties from API
    const purchasedProperties = [
      { id: 1, title: "Cozy Apartment", purchaseDate: "2023-05-15" },
      { id: 2, title: "Spacious House", purchaseDate: "2023-06-01" },
    ]
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Purchased Properties</h2>  
        <div className="space-y-4">
          {purchasedProperties.map((property) => (
            <div key={property.id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">Purchased on: {property.purchaseDate}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default PurchasedProperties
  