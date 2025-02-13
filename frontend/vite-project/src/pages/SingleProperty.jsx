/* import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function SingleProperty() {
  const { id } = useParams(); // Capture the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/property/${id}`); // Use the ID from URL
        if (!response.ok) throw new Error("Property not found");

        const data = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Property not found.");
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // Re-run the effect when `id` changes

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {property && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">{property.title}</h1>
          <div className="text-center mb-4">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="text-center">
            <p>{property.description}</p>
            <p className="font-bold text-blue-600">${property.price?.toLocaleString()}</p>
            <p>{property.city}, {property.country}</p>
            {/* Add other property details here */
          //}
  //        </div>
    //    </>
     // )}
   // </div>
 // );
//}

//export default SingleProperty;
"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { MapPin, Home, Bath, Car } from "lucide-react"
import axios from "axios"

function SingleProperty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/property/${id}`)
        if (!response.ok) throw new Error("Property not found")

        const data = await response.json()
        setProperty(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching property:", err)
        setError("Property not found.")
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const handleAppointment = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("userToken")
      await axios.post(
        "http://localhost:3000/api/appointments",
        {
          propertyId: id,
          date: appointmentDate,
          time: appointmentTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      alert("Appointment scheduled successfully!")
      navigate("/user/dashboard")
    } catch (error) {
      console.error("Appointment scheduling error:", error)
      alert(error.response?.data?.error || "An error occurred while scheduling the appointment")
    }
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {property && (
          <>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">{property.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-xl text-gray-600">{property.description}</p>
                <p className="text-3xl font-bold text-blue-600">${property.price?.toLocaleString()}</p>
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2" />
                  <span>
                    {property.city}, {property.country}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Home className="mr-2 text-blue-500" />
                    <span>{property.facilities?.bedrooms || 0} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-2 text-blue-500" />
                    <span>{property.facilities?.bathrooms || 0} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="mr-2 text-blue-500" />
                    <span>{property.facilities?.parking || 0} Parking</span>
                  </div>
                </div>
                <form onSubmit={handleAppointment} className="space-y-4">
                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                      Appointment Time
                    </label>
                    <input
                      type="time"
                      id="appointmentTime"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Schedule Appointment
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SingleProperty

