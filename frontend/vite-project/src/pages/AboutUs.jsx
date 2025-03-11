"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const AboutUs = () => {
  const [secretKeyPressed, setSecretKeyPressed] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [showAdminLink, setShowAdminLink] = useState(false)

  // Handle keyboard combination (Ctrl+Alt+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === "a") {
        setSecretKeyPressed(true)
        setTimeout(() => setSecretKeyPressed(false), 5000) // Hide after 5 seconds
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle logo click pattern
  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const newCount = prev + 1
      if (newCount === 3) {
        setShowAdminLink(true)
        setTimeout(() => {
          setShowAdminLink(false)
          return 0
        }, 5000) // Hide after 5 seconds
        return 0
      }
      return newCount
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
                alt="Dreamscape Realty Logo"
                className="h-24 w-auto cursor-pointer"
                onClick={handleLogoClick}
              />
            </div>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us - Dreamscape Realty</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Dreamscape Realty</h2>
              <p className="text-gray-600 leading-relaxed">
                Your trusted online destination for buying and renting homes with ease. At Dreamscape Realty, we believe
                that finding your perfect home should be a seamless experience. Whether you're looking to rent a cozy
                apartment or buy your dream house, we simplify the process by connecting you with verified agents who
                handle all legal documentation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We aim to redefine the real estate experience by making property transactions transparent, efficient,
                and hassle-free. Our goal is to empower buyers and renters by offering a secure and user-friendly
                platform where they can explore properties with confidence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Choose Dreamscape Realty?</h2>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                <li>
                  <span className="font-semibold">Verified Agents:</span> Professional assistance to handle legal
                  formalities and ensure smooth transactions.
                </li>
                <li>
                  <span className="font-semibold">Secure Transactions:</span> Reliable platform ensuring safe property
                  dealings.
                </li>
                <li>
                  <span className="font-semibold">Genuine Listings:</span> Every property is reviewed and verified to
                  maintain credibility.
                </li>
                <li>
                  <span className="font-semibold">Easy-to-Use Platform:</span> Intuitive design for a seamless property
                  search experience.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">How It Works</h2>
              <ol className="list-decimal list-inside text-gray-600 leading-relaxed">
                <li>
                  <span className="font-semibold">Browse Properties:</span> Search for homes based on location, price,
                  and type.
                </li>
                <li>
                  <span className="font-semibold">Connect with Agents:</span> Reach out to verified professionals for
                  assistance.
                </li>
                <li>
                  <span className="font-semibold">Secure Your Home:</span> Agents help with documentation and ensure a
                  hassle-free experience.
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">Shubham Chavan</h3>
                  <p className="text-gray-600">KPB Hinduja College</p>
                  <p className="text-gray-600 mt-2">
                    Co-creator of Dreamscape Realty, bringing innovative solutions to the real estate market.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">Vinay Yadav</h3>
                  <p className="text-gray-600">KPB Hinduja College</p>
                  <p className="text-gray-600 mt-2">
                    Co-creator of Dreamscape Realty, dedicated to transforming the property search experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Join Us Today!</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Discover your dream home with Dreamscape Realty. Start exploring properties and let us simplify your
                real estate journey!
              </p>
              <Link
                to="/properties"
                className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Explore Properties
              </Link>

              {/* Secret Admin Login Link - appears when Ctrl+Alt+A is pressed or logo is clicked 3 times */}
              {(secretKeyPressed || showAdminLink) && (
                <Link
                  to="/admin/login"
                  className="ml-4 inline-block bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300 animate-pulse"
                >
                  Admin Access
                </Link>
              )}
            </section>

            <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>© 2024 Dreamscape Realty. Created by Shubham Chavan & Vinay Yadav from KPB Hinduja College.</p>
              {/* Hidden admin link in footer text - only visible on hover */}
              <div className="mt-2 text-[0.1px] text-gray-100 hover:text-gray-500 transition-colors duration-300">
                <Link to="/admin/login">Admin</Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

