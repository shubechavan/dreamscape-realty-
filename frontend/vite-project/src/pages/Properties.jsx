
/*import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setProperties(Array.isArray(data.properties) ? data.properties : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again later.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Properties</h1>
      {properties.length === 0 ? (
        <div className="text-center">No properties available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id?.$oid || property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=200&width=300";
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <p className="text-gray-600 mb-2">
                  {property.description?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-blue-600 font-bold">
                    ${property.price?.toLocaleString()}
                  </p>
                  <p className="text-gray-500">
                    {property.city}, {property.country}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">🛏️ {property.facilities?.bedrooms || 0} beds</span>
                  <span className="text-gray-600">🚿 {property.facilities?.bathrooms || 0} baths</span>
                  <span className="text-gray-600">🚗 {property.facilities?.parking || 0} parking</span>
                </div>
                <Link
                  to={`/property/${property._id?.$oid || property._id}`}
                  className="inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;*/

 //
 import { useState, useEffect } from "react";
 import { Link } from "react-router-dom";
 import React from "react";
 
 function Properties() {
   const [properties, setProperties] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     const fetchProperties = async () => {
       try {
         const response = await fetch("https://dreamscape-realty.onrender.com/api/properties");
         if (!response.ok) throw new Error("Failed to fetch properties");
 
         const data = await response.json();
         console.log("Fetched data:", data);
         setProperties(Array.isArray(data) ? data : []); // Fix here
         setLoading(false);
       } catch (err) {
         console.error("Error fetching properties:", err);
         setError("Failed to fetch properties. Please try again later.");
         setLoading(false);
       }
     };
 
     fetchProperties();
   }, []);
 
   console.log("Rendered properties:", properties);
 
   if (loading) return <div className="text-center py-10">Loading...</div>;
   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
 
   return (
     <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold mb-6 text-center">Available Properties</h1>
       {properties.length === 0 ? (
         <div className="text-center">No properties available</div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {properties.map((property) => (
             <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
               <img
                 src={property.image || "/placeholder.svg"}
                 alt={property.title}
                 className="w-full h-48 object-cover"
                 onError={(e) => (e.target.src = "/placeholder.svg")}
               />
               <div className="p-4">
                 <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                 <p className="text-gray-600 mb-2">
                   {property.description?.substring(0, 100)}...
                 </p>
                 <div className="flex justify-between items-center mb-2">
                   <p className="text-blue-600 font-bold">
                     ${property.price?.toLocaleString()}
                   </p>
                   <p className="text-gray-500">
                     {property.city}, {property.country}
                   </p>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-gray-600">🛏️ {property.facilities?.bedrooms || 0} beds</span>
                   <span className="text-gray-600">🚿 {property.facilities?.bathrooms || 0} baths</span>
                   <span className="text-gray-600">🚗 {property.facilities?.parking || 0} parking</span>
                 </div>
                 <Link
                   to={`/property/${property._id}`} // Updated route to front-end route
                   className="inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                 >
                   View Details
                 </Link>
               </div>
             </div>
           ))}
         </div>
       )}
     </div>
   );
 }
 
 export default Properties;
 