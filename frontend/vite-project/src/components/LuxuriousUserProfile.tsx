import  React from "react"
import { Mail, MapPin, Heart, Eye, Home, User } from "lucide-react"

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
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
     
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="w-full">
          {/* Header Section */}
          <div className="relative h-80 bg-gray-200">
            <div className="absolute bottom-8 left-8 flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-amber-400 overflow-hidden">
                  <img src="/placeholder.svg?height=96&width=96" alt={name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
                <p className="text-amber-400">Ambassador</p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-lg border border-amber-200 bg-white">
                <div className="flex items-center space-x-4">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Properties Viewed</p>
                    <p className="text-2xl font-semibold">{propertiesViewed}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-amber-200 bg-white">
                <div className="flex items-center space-x-4">
                  <Heart className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Favorite Properties</p>
                    <p className="text-2xl font-semibold">{favoriteProperties}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-amber-200 bg-white">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-2xl font-semibold">{location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8 p-6 rounded-lg border border-amber-200 bg-white">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-600 mb-4">{bio}</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recently Viewed Properties</h2>
              <div className="grid grid-cols-3 gap-6">
                {recentProperties.map((property) => (
                  <div key={property.id} className="rounded-lg overflow-hidden border border-amber-200 bg-white">
                    <div className="relative h-48">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-white font-semibold">{property.title}</h3>
                        <p className="text-amber-400">{property.price}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <button className="w-full bg-amber-400 hover:bg-amber-500 text-white py-2 px-4 rounded transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LuxuriousUserProfile

