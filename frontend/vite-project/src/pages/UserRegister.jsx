import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/user/login");
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between p-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          ← BACK
        </Link>
        <Link to="/user/login" className="text-gray-600 hover:text-gray-900">
          LOG IN
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

        <h1 className="text-2xl font-semibold text-center mb-8">Create Your Dreamscape Account</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:border-gray-900 outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>

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
                    placeholder="Create a password"
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

              <button
                type="submit"
                className="w-full bg-gray-100 text-gray-900 py-3 rounded hover:bg-gray-200 transition-colors"
              >
                CREATE ACCOUNT
              </button>

              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            </form>
          </div>

          <div className="space-y-6">
            <div className="text-center text-sm text-gray-500 mb-4">OR</div>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          By creating an account, you agree to our
          <div className="space-x-2">
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
            <span>&</span>
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
