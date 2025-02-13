"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        navigate("/admin/login")
      }
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex justify-between p-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-300">
          ← Back to Home
        </Link>
        <Link to="/admin/login" className="text-gray-600 hover:text-gray-900 transition duration-300">
          Log In
        </Link>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
            alt="Dreamscape Realty Logo"
            className="h-20 w-auto"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Admin Account - Dreamscape Realty</h1>

        <div className="max-w-[500px] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="adminCode">
                Admin Registration Code
              </label>
              <input
                type="text"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                placeholder="Enter admin registration code"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Create Admin Account
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-gray-600">
            By creating an admin account, you agree to our
            <div className="space-x-2">
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              <span>&</span>
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRegister

