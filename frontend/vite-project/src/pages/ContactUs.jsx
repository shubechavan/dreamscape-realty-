import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://dreamscape-realty.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setFormData({ name: "", email: "", details: "" })
      alert("Message sent successfully!")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-25%20at%2015.28.03_8793ce40.jpg-ti9s5dIslHJ5XRq8vEkuygAiddB4MF.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 p-8 md:p-16 h-full flex flex-col bg-white bg-opacity-15">
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              <br />
            </h1>
            <p className="text-xl mb-12 text-gray-600">
              <br />
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-white p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 placeholder-gray-400 bg-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 placeholder-gray-400 bg-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              DETAILS
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter your Project Details"
              rows="4"
              className="w-full px-0 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-900 placeholder-gray-400 bg-transparent resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs

