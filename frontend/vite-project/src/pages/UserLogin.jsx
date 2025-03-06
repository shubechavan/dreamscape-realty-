"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext" // Import useAuth

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth() // Use the login function from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await axios.post("https://dreamscape-realty.onrender.com/api/user/signin", formData)
      console.log("Response data:", response.data) // Debugging

      if (response.data.token) {
        // Use the login function from AuthContext
        login(response.data.token, formData.email)
        console.log("Stored token:", localStorage.getItem("userToken")) // Debugging
        navigate("/user/dashboard")
      } else {
        console.error("No token received from server.")
        setError("Invalid login response. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message)
      setError(error.response?.data?.msg || "An error occurred during login")
    }
  }

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/api/user/signin", formData);
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userEmail", formData.email);
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.msg || "An error occurred during login");
    }
  };*/

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between p-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          ← BACK
        </Link>
        <Link to="/user/register" className="text-gray-600 hover:text-gray-900">
          CREATE ACCOUNT
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

        <h1 className="text-2xl font-semibold text-center mb-8">Log into Dreamscape Realty</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
          {/* Left Column - Login Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:border-gray-900 outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm uppercase mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:border-gray-900 outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                className="w-full bg-gray-100 text-gray-900 py-3 rounded hover:bg-gray-200 transition-colors"
              >
                LOG IN
              </button>
            </form>
          </div>

          {/* Right Column - Social Login */}
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-500 mb-4">OR</div>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded hover:bg-gray-50">
              <img src="https://www.apple.com/favicon.ico" alt="" className="w-5 h-5" />
              Continue with Apple
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded hover:bg-gray-50">
              <img src="https://www.facebook.com/favicon.ico" alt="" className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/user/forgot-password" className="text-blue-600 hover:underline">
            CAN'T LOG IN?
          </Link>
          <div className="mt-4 text-sm text-gray-500">
            Secure Login with reCAPTCHA subject to Google
            <div className="space-x-2">
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms
              </a>
              <span>&</span>
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin

