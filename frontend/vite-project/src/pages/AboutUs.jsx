import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
                alt="Dreamscape Realty Logo"
                className="h-24 w-auto"
              />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Dreamscape Realty</h2>
              <p className="text-gray-600 leading-relaxed">
                At <strong>Dreamscape Realty</strong>, we bridge the gap between your dream home and reality. 
                Whether you're looking to rent a cozy apartment or purchase a luxurious villa, we offer a seamless, 
                secure, and efficient property search experience.  
                <br /><br />
                With a focus on **trust, transparency, and technology**, we connect you with verified agents who handle
                all legal formalities—so you can focus on what matters most: finding your perfect home.
              </p>
            </section>

            {/* Our Mission */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to **simplify** and **modernize** the real estate process by offering a 
                **secure, user-friendly, and transparent** platform. Our goal is to empower homebuyers and renters with 
                the tools and insights they need to make confident property decisions.
              </p>
            </section>

            {/* Why Choose Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Choose Dreamscape Realty?</h2>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                <li><strong>Verified Agents:</strong> Expert professionals ensuring safe and legal transactions.</li>
                <li><strong>Secure Platform:</strong> Your data and transactions are protected.</li>
                <li><strong>Authentic Listings:</strong> Every property is verified for legitimacy.</li>
                <li><strong>User-Friendly Experience:</strong> Seamless navigation for an effortless search.</li>
              </ul>
            </section>

            {/* How It Works */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">How It Works</h2>
              <ol className="list-decimal list-inside text-gray-600 leading-relaxed">
                <li><strong>Browse Properties:</strong> Search homes based on location, budget, and type.</li>
                <li><strong>Connect with Agents:</strong> Reach out to trusted professionals.</li>
                <li><strong>Secure Your Home:</strong> Get expert guidance for documentation and transactions.</li>
              </ol>
            </section>

            {/* Meet Our Team */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">Shubham Chavan</h3>
                  <p className="text-gray-600">KPB Hinduja College</p>
                  <p className="text-gray-600 mt-2">
                    Co-creator of Dreamscape Realty, driven by a vision to transform real estate with technology.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">Vinay Yadav</h3>
                  <p className="text-gray-600">KPB Hinduja College</p>
                  <p className="text-gray-600 mt-2">
                    Co-creator of Dreamscape Realty, passionate about simplifying property search for everyone.
                  </p>
                </div>
              </div>
            </section>

            {/* Mentor Section (Optional) */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mentor</h2>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">[Mentor's Name]</h3>
                <p className="text-gray-600">[Institution Name]</p>
                <p className="text-gray-600 mt-2">
                  A guiding force behind our project, providing invaluable insights and mentorship.
                </p>
              </div>
            </section>

            {/* Call-to-Action */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Find Your Dream Home Today!</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Start your journey with Dreamscape Realty. Let’s make home-hunting easier, together!
              </p>
              <Link
                to="/properties"
                className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Explore Properties
              </Link>
            </section>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>© 2024 Dreamscape Realty. Created by Shubham Chavan & Vinay Yadav from KPB Hinduja College.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
