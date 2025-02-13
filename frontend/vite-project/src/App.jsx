/*import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Properties from "./pages/Properties"
import SingleProperty from "./pages/SingleProperty"
import ContactUs from "./pages/ContactUs"
import UserLogin from "./pages/UserLogin"
import AdminLogin from "./pages/AdminLogin"
import UserRegister from "./pages/UserRegister"
import AdminRegister from "./pages/AdminRegister"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import { AuthProvider } from "./context/AuthContext"
import AboutUs from "./pages/AboutUs"
import SellProperty from "./pages/SellProperty"
import RentHome from "./pages/RentHome"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<SingleProperty />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/register" element={<UserRegister />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/sell" element={<SellProperty />} />
              <Route path="/rent" element={<RentHome />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

*/

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Properties from "./pages/Properties"
import SingleProperty from "./pages/SingleProperty"
import ContactUs from "./pages/ContactUs"
import UserLogin from "./pages/UserLogin"
import UserRegister from "./pages/UserRegister"
import AdminLogin from "./pages/AdminLogin"
import AboutUs from "./pages/AboutUs"
import AdminRegister from "./pages/AdminRegister"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import SellProperty from "./pages/SellProperty"
import RentHome from "./pages/RentHome"
import { AuthProvider, useAuth } from "./context/AuthContext"
import SearchResults from './pages/SearchResults';
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/user/login" />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<SingleProperty />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/sell" element={<SellProperty />} />
            <Route path="/rent" element={<RentHome />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App



