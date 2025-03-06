"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Users,
  Home,
  Calendar,
  LogOut,
  Menu,
  Bell,
  Search,
  Trash2,
  Edit,
  PlusCircle,
  BarChart,
  DollarSign,
  MapPin,
} from "lucide-react"
import AddPropertyModal from "../components/AddPropertyModal"

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        const response = await axios.get(" https://dreamscape-realty.onrender.com/api/admin/dashboard/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setDashboardData(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to fetch dashboard data")
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem("adminToken")
        await axios.delete(` https://dreamscape-realty.onrender.com/api/properties/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        // Refresh dashboard data
        window.location.reload()
      } catch (error) {
        console.error("Error deleting property:", error)
        alert("Failed to delete property")
      }
    }
  }

  const handlePropertyAdded = (newProperty) => {
    setDashboardData((prev) => ({
      ...prev,
      properties: [newProperty, ...(prev.properties || [])],
      stats: {
        ...prev.stats,
        totalProperties: (prev.stats?.totalProperties || 0) + 1,
      },
    }))
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen p-4 shadow-lg ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
              activeTab === "overview" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <BarChart className="mr-3 h-5 w-5" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
              activeTab === "properties" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="mr-3 h-5 w-5" /> Properties
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
              activeTab === "users" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="mr-3 h-5 w-5" /> Users
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
              activeTab === "appointments" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Calendar className="mr-3 h-5 w-5" /> Appointments
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
              <Menu className="text-gray-600" />
            </button>
            <div className="flex-1 px-4">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
              <button onClick={handleLogout} className="ml-4 text-gray-600 hover:text-gray-800">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats?.totalUsers || 0}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats?.totalProperties || 0}</p>
                    </div>
                    <Home className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats?.totalAppointments || 0}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">$1,234,567</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {dashboardData?.stats?.recentUsers?.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">New user registered</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "properties" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Properties</h2>
                <button
                  onClick={() => setIsAddPropertyModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData?.properties?.map((property) => (
                  <div
                    key={property._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{property.title}</h3>
                      <p className="text-gray-600 mb-4">{property.description?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-blue-600 font-bold">${property.price?.toLocaleString()}</span>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.city}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Users</h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Properties
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData?.users?.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {user.purchasedProperties?.length || 0} properties
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData?.appointments?.map((appointment) => (
                        <tr key={appointment._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{appointment.propertyId?.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{appointment.userId?.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <AddPropertyModal
        isOpen={isAddPropertyModalOpen}
        onClose={() => setIsAddPropertyModalOpen(false)}
        onPropertyAdded={handlePropertyAdded}
      />
    </div>
  )
}

export default AdminDashboard

