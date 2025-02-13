import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { Home, Calendar, User, LogOut, Menu, Bell, Search } from 'lucide-react'

const UserDashboard = () => {
  const [purchasedProperties, setPurchasedProperties] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { logout } = useAuth()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("userToken")
        const response = await axios.get("http://localhost:3000/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setPurchasedProperties(Array.isArray(response.data.purchasedProperties) ? response.data.purchasedProperties : [])
        setUserInfo(response.data.userInfo || null)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        if (err.response?.status === 401) {
          logout()
        } else {
          setError("Failed to fetch dashboard data. Please try again later.")
        }
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [logout])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className={`bg-gray-50 w-64 min-h-screen p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dreamscape</h2>
        </div>
        <nav className="space-y-2">
          
          <Link to="/properties" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Calendar className="mr-3 h-5 w-5" /> My Bookings
          </Link>
          <Link to="/profile" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
            <User className="mr-3 h-5 w-5" /> Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu className="text-gray-500" />
            </button>
            <div className="flex-1 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
              <button onClick={logout} className="ml-4 text-gray-600 hover:text-gray-800">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome back, {userInfo?.name}!
          </h2>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Active Bookings</h3>
              <p className="text-3xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Favorite Properties</h3>
              <p className="text-3xl font-bold text-blue-600">7</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Upcoming Viewings</h3>
              <p className="text-3xl font-bold text-blue-600">2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Messages</h3>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
          </div>

          {/* Purchased Properties */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Properties</h3>
            {purchasedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedProperties.map((property) => (
                  <div key={property._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">{property.title}</h4>
                    <p className="text-gray-600 mb-2">{property.address}</p>
                    <Link to={`/property/${property._id}`} className="text-blue-600 hover:underline">
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No properties purchased yet.</p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600">
                <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                <span>Booked a viewing for Seaside Villa on July 15, 2023</span>
              </li>
              <li className="flex items-center text-gray-600">
                <Home className="mr-3 h-5 w-5 text-blue-500" />
                <span>Added Mountain Retreat to favorites on July 10, 2023</span>
              </li>
              <li className="flex items-center text-gray-600">
                <User className="mr-3 h-5 w-5 text-blue-500" />
                <span>Updated profile information on July 5, 2023</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard