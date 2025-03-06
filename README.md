# dreamscape-realty-
# 🌍 Dreamscape Realty

![Dreamscape Realty Banner](https://via.placeholder.com/1000x300?text=Dreamscape+Realty)

## 🏡 About Dreamscape Realty
Dreamscape Realty is a **modern real estate platform** that enables users to **browse, book, and manage property listings** seamlessly. Built with a scalable tech stack, this project provides an intuitive UI and robust backend services for property transactions.

🚀 **Live Demo:** [dreamscape-realty.vercel.app](https://dreamscape-realty.vercel.app/)

## ✨ Features
- 🔍 **Browse Properties** - Find the perfect home from a vast listing database.
- 🏠 **Property Booking** - Users can book properties through a smooth, interactive process.
- 🛡 **Secure Authentication** - JWT-based authentication for both users and admins.
- 📂 **Admin Dashboard** - Manage property listings, users, and bookings efficiently.
- 📧 **Email Service Integration** - Receive booking confirmations via email.

## 🏗 Tech Stack
### **Frontend**
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS

### **Backend**
- 🟢 Node.js, Express.js
- 🗄 MongoDB (Mongoose ORM)
- 🔐 JWT Authentication
- 📧 Nodemailer for Email Service

### **Deployment**
- 🌍 **Frontend:** Vercel
- ⚙ **Backend:** Render / Railway / Any Cloud Provider

## 🛠 Local Setup
Follow these steps to set up the project on your local machine.

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/shubechavan/dreamscape-realty.git
cd dreamscape-realty
```

### **2️⃣ Backend Setup**
```bash
cd backend
npm install
npm start  # Runs on PORT 5000 (Default)
```

### **3️⃣ Frontend Setup**
```bash
cd frontend/vite-project
npm install
npm run dev  # Runs on localhost:5173
```

### **4️⃣ Environment Variables**
Create a `.env` file in both **backend** and **frontend/vite-project** folders.
#### **Backend (.env)**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
#### **Frontend (.env)**
```
VITE_API_URL=http://localhost:5000
```

## 📜 API Endpoints (Backend)
| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/properties`      | Get all properties       |
| POST   | `/api/properties`      | Add new property (Admin) |
| POST   | `/api/users/register`  | User Registration       |
| POST   | `/api/users/login`     | User Login              |
| POST   | `/api/bookings`        | Book a property         |

## 🚀 Deployment Guide
### **Frontend (Vercel)**
1. Push your project to **GitHub**.
2. Go to [Vercel](https://vercel.com/) and import your repo.
3. Set the **Root Directory** to `frontend/vite-project`.
4. Configure **Environment Variables**.
5. Click **Deploy**.

### **Backend (Render/Railway)**
1. Push the **backend** code to GitHub.
2. Deploy it on **Render** / **Railway** / **Any Node.js Host**.
3. Add **MongoDB URI** and other env variables.
4. Connect frontend to deployed backend.

## 👨‍💻 Contributing
Pull requests are welcome! Follow these steps to contribute:
1. Fork the repo & create a new branch.
2. Make your changes & commit.
3. Open a pull request.

## 📞 Contact
- ✉️ Email: shubhamchavancool332@gmail.com
- 🔗 GitHub: [shubechavan](https://github.com/shubechavan)

---

🌟 **If you like this project, consider giving it a star on GitHub!** ⭐

