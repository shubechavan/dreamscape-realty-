"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { MapPin, Home, Bath, Car, CreditCard, Calendar } from "lucide-react"
import axios from "axios"

function SingleProperty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("pending") // pending, success, failed
  const [paymentMessage, setPaymentMessage] = useState("")
  const [processingPayment, setProcessingPayment] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const [appointmentPaymentStatus, setAppointmentPaymentStatus] = useState("pending")

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://dreamscape-realty.onrender.com/api/property/${id}`)
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

    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [id])

  const handleAppointment = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("userToken")
      const response = await axios.post(
        "https://dreamscape-realty.onrender.com/api/appointments",
        {
          propertyId: id,
          date: appointmentDate,
          time: appointmentTime,
          phoneNumber,
          email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // If appointment requires payment
      if (response.data.requiresPayment) {
        setCurrentAppointment(response.data.appointment)
        handleAppointmentPayment(response.data.appointment._id)
      } else {
        alert("Appointment scheduled successfully!")
        navigate("/user/dashboard")
      }
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const handleAppointmentPayment = async (appointmentId) => {
    try {
      setProcessingPayment(true)
      // Create a Razorpay order for appointment
      const token = localStorage.getItem("userToken")
      const orderResponse = await axios.post(
        "https://dreamscape-realty.onrender.com/api/create-appointment-payment",
        {
          appointmentId: appointmentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const { orderId, amount, currency, keyId } = orderResponse.data

      // Initialize Razorpay payment
      const options = {
        key: keyId || process.env.RAZORPAY_KEY_ID,
        amount: amount, // Amount in paise
        currency: currency,
        name: "Dreamscape Realty",
        description: `Appointment Fee for ${property.title}`,
        order_id: orderId,
        handler: (response) => {
          handleAppointmentPaymentSuccess(response, appointmentId)
        },
        prefill: {
          name: "",
          email: email,
          contact: phoneNumber,
        },
        notes: {
          appointmentId: appointmentId,
          propertyId: id,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            setProcessingPayment(false)
          },
        },
      }

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options)
      razorpay.open()

      // Handle Razorpay errors
      razorpay.on("payment.failed", (response) => {
        setAppointmentPaymentStatus("failed")
        setPaymentMessage("Appointment payment failed. Please try again.")
        setProcessingPayment(false)
        console.error("Payment failed:", response.error)
      })
    } catch (error) {
      console.error("Error initiating appointment payment:", error)
      setAppointmentPaymentStatus("failed")
      setPaymentMessage("Failed to initiate appointment payment. Please try again.")
      setProcessingPayment(false)
    }
  }

  const handleAppointmentPaymentSuccess = async (response, appointmentId) => {
    try {
      // Verify appointment payment on the server
      const token = localStorage.getItem("userToken")
      await axios.post(
        "https://dreamscape-realty.onrender.com/api/verify-appointment-payment",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          appointmentId: appointmentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Update UI
      setAppointmentPaymentStatus("success")
      setPaymentMessage("Appointment payment successful! Your viewing is confirmed.")
      setProcessingPayment(false)

      // Redirect after a delay
      setTimeout(() => {
        navigate("/user/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Error verifying appointment payment:", error)
      setAppointmentPaymentStatus("failed")
      setPaymentMessage("Appointment payment verification failed. Please contact support.")
      setProcessingPayment(false)
    }
  }

  const handlePayment = async () => {
    try {
      setProcessingPayment(true)
      // Step 1: Create a Razorpay order
      const token = localStorage.getItem("userToken")
      const orderResponse = await axios.post(
        "https://dreamscape-realty.onrender.com/api/create-payment",
        {
          amount: property.price,
          currency: "INR",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const { orderId, amount, currency, keyId } = orderResponse.data

      // Step 2: Initialize Razorpay payment
      const options = {
        key: keyId || process.env.RAZORPAY_KEY_ID,
        amount: amount, // Amount in paise
        currency: currency,
        name: "Dreamscape Realty",
        description: `Payment for ${property.title}`,
        order_id: orderId,
        handler: (response) => {
          // Step 3: Handle successful payment
          handlePaymentSuccess(response)
        },
        prefill: {
          name: "", // You can prefill user's name if available
          email: email || "", // Use email from appointment form if available
          contact: phoneNumber || "", // Use phone from appointment form if available
        },
        notes: {
          propertyId: id,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            setProcessingPayment(false)
          },
        },
      }

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options)
      razorpay.open()

      // Handle Razorpay errors
      razorpay.on("payment.failed", (response) => {
        setPaymentStatus("failed")
        setPaymentMessage("Payment failed. Please try again.")
        setProcessingPayment(false)
        console.error("Payment failed:", response.error)
      })
    } catch (error) {
      console.error("Error initiating payment:", error)
      setPaymentStatus("failed")
      setPaymentMessage("Failed to initiate payment. Please try again.")
      setProcessingPayment(false)
    }
  }

  const handlePaymentSuccess = async (response) => {
    try {
      // Verify payment on the server
      const token = localStorage.getItem("userToken")
      await axios.post(
        "https://dreamscape-realty.onrender.com/api/verify-payment",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          propertyId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Update UI
      setPaymentStatus("success")
      setPaymentMessage("Payment successful! Property purchased.")
      setProcessingPayment(false)

      // Purchase the property
      await axios.post(
        `https://dreamscape-realty.onrender.com/api/user/purchase-property/${id}`,
        {
          paymentId: response.razorpay_payment_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Redirect after a delay
      setTimeout(() => {
        navigate("/user/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Error verifying payment:", error)
      setPaymentStatus("failed")
      setPaymentMessage("Payment verification failed. Please contact support.")
      setProcessingPayment(false)
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

            {paymentStatus !== "pending" && (
              <div
                className={`mb-6 p-4 rounded-lg ${paymentStatus === "success" ? "bg-green-100 border border-green-400" : "bg-red-100 border border-red-400"}`}
              >
                <p className={`text-lg ${paymentStatus === "success" ? "text-green-700" : "text-red-700"}`}>
                  {paymentMessage}
                </p>
              </div>
            )}

            {appointmentPaymentStatus !== "pending" && (
              <div
                className={`mb-6 p-4 rounded-lg ${appointmentPaymentStatus === "success" ? "bg-green-100 border border-green-400" : "bg-red-100 border border-red-400"}`}
              >
                <p className={`text-lg ${appointmentPaymentStatus === "success" ? "text-green-700" : "text-red-700"}`}>
                  {paymentMessage}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xl text-gray-600">{property.description}</p>
                <p className="text-3xl font-bold text-blue-600">₹{property.price?.toLocaleString()}</p>
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

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">Interested in this Property?</h3>
                  <button
                    onClick={() => {
                      // Store property details in localStorage for the contact form
                      localStorage.setItem(
                        "inquiryProperty",
                        JSON.stringify({
                          id: property._id,
                          title: property.title,
                        }),
                      )
                      // Navigate to contact page
                      navigate("/contact")
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Contact Agent
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Schedule a Viewing</h2>
                <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-blue-800 font-medium">Appointment Fee: ₹500</p>
                      <p className="text-sm text-blue-600">This fee is required to confirm your viewing appointment</p>
                    </div>
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={processingPayment}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-70"
                  >
                    {processingPayment ? (
                      "Processing..."
                    ) : (
                      <>
                        <Calendar className="mr-2 h-5 w-5" />
                        Schedule & Pay ₹500
                      </>
                    )}
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

