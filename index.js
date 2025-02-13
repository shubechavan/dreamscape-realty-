import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv" // Import dotenv

dotenv.config() // Load environment variables

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB using the MONGODB_URI from .env
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Define MongoDB schemas and models
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  purchasedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
})

const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  address: String,
  city: String,
  country: String,
  facilities: {
    bedrooms: Number,
    bathrooms: Number,
    parking: Number,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const User = mongoose.model("User", UserSchema)
const Property = mongoose.model("Property", PropertySchema)
// Function to send contact form email
const sendContactEmail = async (name, email, details) => {
  // Email to admin (you)
  const adminMailOptions = {
    from: process.env.EMAIL_USER, // Use EMAIL_USER from .env
    to: process.env.CONTACT_EMAIL, // Admin email for contact form
    subject: "New Contact Us Message",
    text: `You have received a new message from the contact form:

    Name: ${name}
    Email: ${email}
    Details: ${details}`,
  }

  // Auto-reply email to the user
  const userMailOptions = {
    from: process.env.EMAIL_USER, // Use EMAIL_USER from .env
    to: email, // The email provided by the user
    subject: "Thank you for contacting us",
    text: `Dear ${name},

Thank you for reaching out to us. We have received your message and our team is reviewing the details. We will get back to you as soon as possible.

Looking forward to assisting you.

Best regards,
[Your Company Name] Team`,
  }

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions)

    // Send auto-reply to the user
    await transporter.sendMail(userMailOptions)

    console.log("Contact email sent successfully")
  } catch (error) {
    console.error("Error sending contact email:", error)
  }
}

// Nodemailer transporter setup using EMAIL_USER and EMAIL_PASS from .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use EMAIL_USER from .env
    pass: process.env.EMAIL_PASS, // Use EMAIL_PASS from .env
  },
})

// Function to send registration email
const sendRegistrationEmail = async (name, email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use EMAIL_USER from .env
    to: email,
    subject: "Welcome to Dreamscape Realty",
    text: `Dear ${name},

Welcome to Dreamscape Realty! We're excited to have you on board.

At Dreamscape Realty, we provide a wide range of properties to match your needs, and we're here to help you every step of the way. Thank you for registering with us.

Best regards,
The Dreamscape Realty Team`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Registration email sent successfully")
  } catch (error) {
    console.error("Error sending registration email:", error)
  }
}
// Get a single property
app.get("/api/property/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Function to send property purchase email
const sendPurchaseEmail = async (name, email, propertyTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use EMAIL_USER from .env
    to: email,
    subject: "Property Purchase Confirmation",
    text: `Dear ${name},

Congratulations on your successful purchase of the property: ${propertyTitle}!

We thank you for choosing Dreamscape Realty, and we hope that this property brings you much happiness. Our team is here to assist you with any further needs or inquiries you may have.

Best regards,
The Dreamscape Realty Team`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Purchase email sent successfully")
  } catch (error) {
    console.error("Error sending purchase email:", error)
  }
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Access denied" })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET) // Use JWT_SECRET from .env
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: "Invalid token" })
  }
}

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Admin access required" })
  next()
}

// User registration
app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    // Send registration email
    await sendRegistrationEmail(name, email)

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// User login
app.post("/api/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: "User not found" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: "Invalid password" })

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET) // Use JWT_SECRET from .env
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all properties
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find()
    res.json(properties)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get a single property
app.get("/api/property/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Purchase a property
app.post("/api/user/purchase-property/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ error: "Property not found" })

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ error: "User not found" })

    user.purchasedProperties.push(property._id)
    await user.save()

    // Send purchase confirmation email
    await sendPurchaseEmail(user.name, user.email, property.title)

    res.json({ message: "Property purchased successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get user's purchased properties
app.get("/api/user/purchased-property", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("purchasedProperties")
    res.json({ properties: user.purchasedProperties })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Add a new property (admin only)
app.post("/api/properties", verifyToken, isAdmin, async (req, res) => {
  try {
    const property = new Property(req.body)
    await property.save()
    res.status(201).json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update a property (admin only)
app.put("/api/properties/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete a property (admin only)
app.delete("/api/properties/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/user/dashboard", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("purchasedProperties")
    const totalProperties = await Property.countDocuments()
    const recentProperties = await Property.find().sort({ createdAt: -1 }).limit(5)

    res.json({
      user: {
        name: user.name,
        email: user.email,
        purchasedPropertiesCount: user.purchasedProperties.length,
      },
      purchasedProperties: user.purchasedProperties,
      totalProperties,
      recentProperties,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/admin/dashboard", verifyToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalProperties = await Property.countDocuments()
    const recentProperties = await Property.find().sort({ createdAt: -1 }).limit(10)
    const recentUsers = await User.find().sort({ _id: -1 }).limit(10)

    res.json({
      totalUsers,
      totalProperties,
      recentProperties,
      recentUsers,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, details } = req.body

    await sendContactEmail(name, email, details)

    res.status(200).json({ message: "Your message has been sent successfully!" })
  } catch (error) {
    res.status(500).json({ error: "Error sending message. Please try again." })
  }
})
app.get("/api/property/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post("/api/property/sell", verifyToken, async (req, res) => {
  try {
    const { title, description, price, address, city, country, bedrooms, bathrooms, parking, image } = req.body

    const newProperty = new Property({
      title,
      description,
      price,
      image,
      address,
      city,
      country,
      facilities: {
        bedrooms,
        bathrooms,
        parking,
      },
      createdBy: req.user._id,
    })

    await newProperty.save()
    res.status(201).json({ message: "Property submitted for selling successfully", property: newProperty })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

console.log("Server is set up and running. You can now test the API endpoints.")

