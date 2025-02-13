import  React from "react"
import { Mail, MapPin, Heart, Eye, ChevronRight } from "lucide-react"

interface UserProfileProps {
  name: string
  username: string
  email: string
  location: string
  bio: string
  propertiesViewed: number
  favoriteProperties: number
  recentProperties: Array<{
    id: string
    title: string
    image: string
    price: string
  }>
}

const LuxuriousUserProfile: React.FC<UserProfileProps> = ({
  name,
  username,
  email,
  location,
  bio,
  propertiesViewed,
  favoriteProperties,
  recentProperties,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative h-80 rounded-xl overflow-hidden mb-8">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute bottom-0 left-0 p-8 flex items-end space-x-4">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold">{name}</h1>
              <p className="text-xl text-gray-300">@{username}</p>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-filter backdrop-blur-lg">
            <div className="flex items-center space-x-4">
              <Eye className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-lg text-gray-400">Properties Viewed</p>
                <p className="text-3xl font-bold">{propertiesViewed}</p>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-filter backdrop-blur-lg">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-lg text-gray-400">Favorite Properties</p>
                <p className="text-3xl font-bold">{favoriteProperties}</p>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-filter backdrop-blur-lg">
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-lg text-gray-400">Location</p>
                <p className="text-3xl font-bold">{location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-filter backdrop-blur-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-300 mb-6">{bio}</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Recent Properties */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recently Viewed Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <div key={property.id} className="bg-white bg-opacity-10 rounded-xl overflow-hidden group">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-300 mb-4">{property.price}</p>
                  <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LuxuriousUserProfile

