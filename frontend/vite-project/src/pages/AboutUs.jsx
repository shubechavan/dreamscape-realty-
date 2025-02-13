import { Link } from "react-router-dom"

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png" alt="Dreamscape Realty Logo" className="h-24 w-auto" />
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
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

