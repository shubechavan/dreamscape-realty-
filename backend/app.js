import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import Razorpay from "razorpay"
import crypto from "crypto"
dotenv.config()
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID)
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Not Loaded")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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

const AppointmentSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  fee: { type: Number, default: 500 },
  isPaid: { type: Boolean, default: false },
  paymentId: { type: String },
  paymentDate: { type: Date },
})

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
})

const PurchaseSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  purchaseDate: { type: Date, default: Date.now },
  purchasePrice: { type: Number, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["completed", "pending", "failed"], default: "completed" },
})

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["new", "in-progress", "resolved"],
    default: "new",
  },
})

const Purchase = mongoose.model("Purchase", PurchaseSchema)

const User = mongoose.model("User", UserSchema)
const Property = mongoose.model("Property", PropertySchema)
const Appointment = mongoose.model("Appointment", AppointmentSchema)
const Payment = mongoose.model("Payment", PaymentSchema)
const Contact = mongoose.model("Contact", ContactSchema)

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const sendContactEmail = async (name, email, details) => {
  if (!process.env.CONTACT_EMAIL) {
    console.warn("CONTACT_EMAIL environment variable is not defined. Using sender email as recipient.")
    process.env.CONTACT_EMAIL = process.env.EMAIL_USER
  }

  const adminHtmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 5px;
      }
      .header {
        background-color: #f8f8f8;
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #eee;
      }
      .content {
        padding: 20px;
      }
      .details {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #777;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Contact Form Submission</h2>
      </div>
      <div class="content">
        <p>You have received a new message from the contact form:</p>
        <div class="details">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Details:</strong> ${details}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p>Please respond to this inquiry at your earliest convenience.</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Dreamscape Realty. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `

  const userHtmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 5px;
      }
      .header {
        background-color: #f8f8f8;
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #eee;
      }
      .logo {
        max-width: 200px;
        height: auto;
        margin-bottom: 10px;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #777;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png" alt="Dreamscape Realty Logo" class="logo">
        <h2>Thank You for Contacting Dreamscape Realty</h2>
      </div>
      <div class="content">
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and our team is reviewing the details.</p>
        <p>We strive to respond to all inquiries within 24-48 hours during business days.</p>
        <p>If your matter requires immediate attention, please call us at <strong>(+91) 9167093429</strong>.</p>
        <p>Looking forward to assisting you with your real estate needs.</p>
        <p>Best regards,<br>The Dreamscape Realty Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Dreamscape Realty. All rights reserved.</p>
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  </body>
  </html>
  `
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    subject: "New Contact Us Message - Dreamscape Realty",
    html: adminHtmlTemplate,
    text: `You have received a new message from the contact form:

    Name: ${name}
    Email: ${email}
    Details: ${details}`,
  }

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting Dreamscape Realty",
    html: userHtmlTemplate,
    text: `Dear ${name},

Thank you for reaching out to us. We have received your message and our team is reviewing the details. We will get back to you as soon as possible.

Looking forward to assisting you.

Best regards,
Dreamscape Realty Team`,
  }

  try {
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)
    console.log("Contact email sent successfully")
    return true
  } catch (error) {
    console.error("Error sending contact email:", error)
    throw error
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendRegistrationEmail = async (name, email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
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
const sendAppointmentConfirmationEmail = async (email, appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Appointment Confirmation - Dreamscape Realty",
    text: `Dear User,

Your appointment has been successfully scheduled and confirmed.

Appointment Details:
Date: ${appointment.date}
Time: ${appointment.time}
Property ID: ${appointment.propertyId}
Phone Number: ${appointment.phoneNumber}

Thank you for choosing Dreamscape Realty.

Best regards,
The Dreamscape Realty Team`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Appointment confirmation email sent successfully")
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error)
  }
}

app.get("/api/property/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

const sendPurchaseEmail = async (name, email, propertyTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
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

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Access denied" })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: "Invalid token" })
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: "Admin access required" })
  next()
}

app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    await sendRegistrationEmail(name, email)

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post("/api/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: "User not found" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: "Invalid password" })

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find()
    res.json(properties)
  } catch (error) {
    res.status(400).json({ error: error.message })
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

app.post("/api/user/purchase-property/:id", verifyToken, async (req, res) => {
  try {
    const { paymentId } = req.body
    const propertyId = req.params.id

    const property = await Property.findById(propertyId)
    if (!property) return res.status(404).json({ error: "Property not found" })

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ error: "User not found" })

    if (!user.purchasedProperties.includes(property._id)) {
      user.purchasedProperties.push(property._id)
      await user.save()
    }

    const purchase = new Purchase({
      propertyId: property._id,
      userId: user._id,
      purchaseDate: new Date(),
      purchasePrice: property.price,
      paymentId: paymentId,
      status: "completed",
    })

    await purchase.save()

    await sendPurchaseEmail(user.name, user.email, property.title)

    res.json({
      message: "Property purchased successfully",
      purchase: purchase,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/user/purchased-property", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("purchasedProperties")
    res.json({ properties: user.purchasedProperties })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post("/api/properties", verifyToken, isAdmin, async (req, res) => {
  try {
    const property = new Property(req.body)
    await property.save()
    res.status(201).json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put("/api/properties/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!property) return res.status(404).json({ error: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

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

    const newContact = new Contact({
      name,
      email,
      details,
      status: "new",
    })

    await newContact.save()
    console.log("Contact form submission saved to database with ID:", newContact._id)

    try {
      await sendContactEmail(name, email, details)
    } catch (emailError) {
      console.error("Error sending email, but contact was saved:", emailError)
    }

    res.status(200).json({
      message: "Your message has been sent successfully!",
      contactId: newContact._id,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
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

app.post("/api/create-payment", verifyToken, async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body
    const userId = req.user._id

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: userId.toString(),
      },
    }

    const order = await razorpay.orders.create(options)

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    res.status(500).json({ error: "Could not create Razorpay order" })
  }
})

app.post("/api/verify-payment", verifyToken, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, propertyId } = req.body

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = shasum.digest("hex")

    if (digest !== razorpay_signature) {
      return res.status(400).json({ error: "Transaction not legit!" })
    }

    const payment = new Payment({
      userId: req.user._id,
      propertyId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: await getPropertyPrice(propertyId),
      status: "completed",
    })

    await payment.save()

    res.json({
      success: true,
      message: "Payment has been verified",
      paymentId: razorpay_payment_id,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    res.status(500).json({ error: "Could not verify payment" })
  }
})

async function getPropertyPrice(propertyId) {
  try {
    const property = await Property.findById(propertyId)
    return property ? property.price * 100 : 0
  } catch (error) {
    console.error("Error getting property price:", error)
    return 0
  }
}

app.post("/api/admin/register", (req, res) => {
  return res.status(403).json({ error: "Admin registration is not allowed." })
})

app.post("/api/admin/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    console.log("Attempting admin login for:", email)

    const admin = await User.findOne({ email, isAdmin: true })
    if (!admin) {
      console.log("Admin not found")
      return res.status(400).json({ error: "Admin not found" })
    }

    const validPassword = await bcrypt.compare(password, admin.password)
    if (!validPassword) {
      console.log("Invalid password")
      return res.status(400).json({ error: "Invalid password" })
    }

    const token = jwt.sign({ _id: admin._id, isAdmin: true }, process.env.JWT_SECRET)
    console.log("Admin login successful")
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } })
  } catch (error) {
    console.error("Admin login error:", error)
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/admin/dashboard/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("purchasedProperties")
    const properties = await Property.find().populate("createdBy", "name email")
    const appointments = await Appointment.find().populate("propertyId").populate("userId", "name email")

    const stats = {
      totalUsers: await User.countDocuments(),
      totalProperties: await Property.countDocuments(),
      totalAppointments: await Appointment.countDocuments(),
      recentUsers: await User.find().sort({ _id: -1 }).limit(5).select("name email"),
      recentAppointments: await Appointment.find()
        .sort({ date: -1 })
        .limit(5)
        .populate("propertyId userId", "name email"),
    }

    res.json({ success: true, stats, users, properties, appointments })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard data", details: error.message })
  }
})

app.get("/api/admin/dashboard/metrics", verifyToken, isAdmin, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || "week"
    const startDate = new Date()
    if (timeframe === "week") startDate.setDate(startDate.getDate() - 7)
    if (timeframe === "month") startDate.setMonth(startDate.getMonth() - 1)
    if (timeframe === "year") startDate.setFullYear(startDate.getFullYear() - 1)

    const metrics = {
      newUsers: await User.countDocuments({ createdAt: { $gte: startDate } }),
      newProperties: await Property.countDocuments({ createdAt: { $gte: startDate } }),
      newAppointments: await Appointment.countDocuments({ date: { $gte: startDate } }),
    }

    res.json({ success: true, timeframe, metrics })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metrics", details: error.message })
  }
})

app.get("/api/admin/dashboard/property-analytics", verifyToken, isAdmin, async (req, res) => {
  try {
    const analytics = {
      priceRanges: await Property.aggregate([
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 100000, 250000, 500000, 1000000, Number.POSITIVE_INFINITY],
            output: { count: { $sum: 1 } },
          },
        },
      ]),
      cityDistribution: await Property.aggregate([{ $group: { _id: "$city", count: { $sum: 1 } } }]),
    }

    res.json({ success: true, analytics })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property analytics", details: error.message })
  }
})

app.get("/api/admin/dashboard/user-analytics", verifyToken, isAdmin, async (req, res) => {
  try {
    const analytics = {
      registrationTrends: await User.aggregate([
        { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
      ]),
      userTypes: await User.aggregate([{ $group: { _id: "$isAdmin", count: { $sum: 1 } } }]),
    }

    res.json({ success: true, analytics })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user analytics", details: error.message })
  }
})

app.post("/api/appointments", verifyToken, async (req, res) => {
  try {
    const { propertyId, date, time, phoneNumber, email } = req.body
    const userId = req.user._id

    const newAppointment = new Appointment({
      propertyId,
      userId,
      date,
      time,
      phoneNumber,
      email,
      fee: 500,
      isPaid: false,
    })

    await newAppointment.save()

    res.status(201).json({
      message: "Appointment created. Please complete payment to confirm.",
      appointment: newAppointment,
      requiresPayment: true,
    })
  } catch (error) {
    console.error("Error processing appointment:", error)
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/properties/search", async (req, res) => {
  try {
    const { query } = req.query
    console.log("Received search query:", query)
    const properties = await Property.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    })
    console.log("Found properties:", properties.length)
    res.json(properties)
  } catch (error) {
    console.error("Error in search:", error)
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/user/appointments", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id }).populate("propertyId")
    res.json(appointments)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post("/api/create-appointment-payment", verifyToken, async (req, res) => {
  try {
    const { appointmentId } = req.body

    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" })
    }

    if (appointment.isPaid) {
      return res.status(400).json({ error: "Appointment is already paid" })
    }

    const options = {
      amount: appointment.fee * 100,
      currency: "INR",
      receipt: `appointment_${appointmentId}`,
      payment_capture: 1,
      notes: {
        userId: req.user._id.toString(),
        appointmentId: appointmentId,
      },
    }

    const order = await razorpay.orders.create(options)

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Error creating appointment payment:", error)
    res.status(500).json({ error: "Could not create appointment payment" })
  }
})

app.post("/api/verify-appointment-payment", verifyToken, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, appointmentId } = req.body

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = shasum.digest("hex")

    if (digest !== razorpay_signature) {
      return res.status(400).json({ error: "Transaction not legit!" })
    }

    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" })
    }

    appointment.isPaid = true
    appointment.paymentId = razorpay_payment_id
    appointment.paymentDate = new Date()
    appointment.status = "confirmed"
    await appointment.save()

    const payment = new Payment({
      userId: req.user._id,
      propertyId: appointment.propertyId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: appointment.fee * 100,
      status: "completed",
    })

    await payment.save()

    await sendAppointmentConfirmationEmail(appointment.email, appointment)

    res.json({
      success: true,
      message: "Appointment payment verified successfully",
      appointment: appointment,
    })
  } catch (error) {
    console.error("Error verifying appointment payment:", error)
    res.status(500).json({ error: "Could not verify appointment payment" })
  }
})

app.get("/api/admin/purchases", verifyToken, isAdmin, async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("propertyId")
      .populate("userId", "name email")
      .sort({ purchaseDate: -1 })

    res.json(purchases)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchases", details: error.message })
  }
})

app.get("/api/user/purchases", verifyToken, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user._id }).populate("propertyId").sort({ purchaseDate: -1 })

    res.json(purchases)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get("/api/admin/contacts", verifyToken, isAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact submissions", details: error.message })
  }
})

app.put("/api/admin/contacts/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true })

    if (!contact) {
      return res.status(404).json({ error: "Contact submission not found" })
    }

    res.json(contact)
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact status", details: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

console.log("Server is set up and running. You can now test the API endpoints.")

