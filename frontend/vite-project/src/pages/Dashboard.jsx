"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import UserDashboard from "../components/UserDashboard"
import AdminDashboard from "../components/AdminDashboard"

function Dashboard({ isAdmin }) {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem(isAdmin ? "adminToken" : "userToken")
        const response = await axios.get(`http://localhost:3000/api/${isAdmin ? "admin" : "user"}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Dashboard data:", response.data)
        setDashboardData(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to fetch dashboard data. Please try again later.")
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [isAdmin])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  if (!dashboardData) return <div className="flex justify-center items-center h-screen">No data available</div>

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">{isAdmin ? "Admin Dashboard" : "User Dashboard"}</h1>
      {isAdmin ? <AdminDashboard dashboardData={dashboardData} /> : <UserDashboard dashboardData={dashboardData} />}
    </div>
  )
}

export default Dashboard

