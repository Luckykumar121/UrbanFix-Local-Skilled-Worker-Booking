# Project Structure - Local Skilled

## Overview

Local Skilled is a worker booking platform built with React (frontend) and Node.js/Express (backend).

---

## 📁 Directory Structure

```
local-skilled/
│
├── 📄 Project Documentation
│   ├── BASIC_EXPLANATION.md
│   ├── CONTACT_PAGE_SETUP.md
│   ├── DEBUGGING_REPORT.md
│   ├── PRESENTATION_GUIDE.md
│   ├── PROJECT_INTRODUCTION.md
│   ├── PROJECT_PRESENTATION.md
│   ├── PROJECT_REPORT.md
│   └── PROJECT_STRUCTURE.md (this file)
│
├── 🚀 Scripts
│   └── generate_presentation.bat
│
├── 📦 CLIENT (React Frontend)
│   │
│   ├── package.json
│   │
│   └── worker-booking-front/
│       ├── 📄 Configuration & Setup
│       │   ├── .gitignore
│       │   ├── eslint.config.js
│       │   ├── vite.config.js
│       │   ├── package.json
│       │   ├── README.md
│       │   ├── index.html
│       │   └── nrd.bat (build script)
│       │
│       ├── 📁 public/
│       │   └── Static assets
│       │
│       └── 📁 src/
│           ├── 📄 Main Files
│           │   ├── App.jsx (Main App Component)
│           │   ├── App.css
│           │   ├── main.jsx (Entry Point)
│           │   └── index.css
│           │
│           ├── 🎨 assets/
│           │   ├── icons/
│           │   └── images/
│           │
│           ├── 🧩 components/ (Reusable Components)
│           │   ├── AdminDashboard.jsx
│           │   ├── AdminDashboard.css
│           │   ├── AllWorkers.jsx
│           │   ├── Category_count.jsx
│           │   ├── Categorycard.jsx
│           │   ├── CategoryWorkers.jsx
│           │   ├── Choosecard.jsx
│           │   ├── Fetchworkers.jsx
│           │   ├── Footer.jsx
│           │   ├── Homepage.jsx
│           │   ├── Navcompo.jsx
│           │   ├── Slider.jsx
│           │   ├── Whychoose.jsx
│           │   │
│           │   └── auth/ (Authentication Components)
│           │       ├── Loginform.jsx
│           │       ├── Signupform.jsx
│           │       ├── VerifyEmail.jsx
│           │       └── Workerform.jsx
│           │
│           ├── 📄 context/ (Context API)
│           │   └── (State management files)
│           │
│           ├── 📄 pages/ (Page Components)
│           │   ├── AboutUs.jsx
│           │   ├── Booking.jsx
│           │   ├── Contact.jsx
│           │   ├── Home.jsx
│           │   ├── Login.jsx
│           │   ├── Request.jsx
│           │   ├── Signup.jsx
│           │   └── UserProfile.jsx
│           │
│           ├── 🛣️ routes/ (Routing)
│           │   └── (Route configuration files)
│           │
│           ├── 🔗 services/ (API Calls)
│           │   └── (Service/API integration files)
│           │
│           └── 🔧 utils/ (Utilities)
│               └── util.jsx
│
├── 🖥️ SERVER (Node.js/Express Backend)
│   │
│   ├── 📄 Configuration & Setup
│   │   ├── .env (Environment variables)
│   │   ├── package.json
│   │   └── server.js (Main server entry point)
│   │
│   ├── ⚙️ config/ (Configuration)
│   │   └── db.js (Database connection)
│   │
│   ├── 🎮 controllers/ (Business Logic)
│   │   ├── admincontroller.js
│   │   ├── authcontroller.js
│   │   ├── contactcontroller.js
│   │   └── workercontroller.js
│   │
│   ├── 🛡️ middlewares/ (Middleware Functions)
│   │   ├── adminAuth.js (Admin authentication)
│   │   ├── auth.js (User authentication)
│   │   ├── Email.config.js (Email configuration)
│   │   ├── Email.js (Email sending)
│   │   ├── EmailTemplate.js (Email templates)
│   │   └── validation.js (Input validation)
│   │
│   ├── 📊 models/ (Database Models)
│   │   ├── request.js (Request model)
│   │   ├── user.js (User model)
│   │   └── workermodel.js (Worker model)
│   │
│   ├── 🛣️ routes/ (API Routes)
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   └── workerRoutes.js
│   │
│   └── 🔧 utils/ (Utility Functions)
│       └── (Utility helper files)
│

```

---

## 📋 Key Features by Module

### Frontend (React)

- **Components**: Reusable UI components for cards, dashboard, sliders
- **Pages**: Different application pages (Home, Booking, Profile, etc.)
- **Authentication**: Login, Signup, Email verification, Worker form
- **Services**: API communication layer
- **Context**: State management
- **Utils**: Helper functions

### Backend (Node.js/Express)

- **Controllers**: Handle business logic for admin, auth, contact, and workers
- **Models**: MongoDB/Database schemas (Users, Workers, Requests)
- **Routes**: RESTful API endpoints
- **Middleware**: Authentication, validation, email services
- **Config**: Database configuration and setup

### Database Models

1. **User Model** - User information and authentication
2. **Worker Model** - Worker profiles and details
3. **Request Model** - Booking/service requests

---

## 🔄 Project Flow

```
User Request
    ↓
Routes (Frontend/Backend)
    ↓
Controllers (Business Logic)
    ↓
Models (Database Operations)
    ↓
Middleware (Validation, Auth, Email)
    ↓
Response to Client
```

---

## 🚀 Getting Started

### Frontend

```bash
cd client/worker-booking-front
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev  # or nodemon server.js
```

---

## 📝 Technologies Used

- **Frontend**: React, Vite, ESLint
- **Backend**: Node.js, Express
- **Database**: MongoDB (Models structure suggests)
- **Email**: Nodemailer (Email.js, Email.config.js)
- **Authentication**: JWT (auth.js, adminAuth.js)

---

## 📚 Documentation Files

- `PROJECT_INTRODUCTION.md` - Project overview
- `PROJECT_REPORT.md` - Project report and findings
- `BASIC_EXPLANATION.md` - Basic explanation
- `DEBUGGING_REPORT.md` - Debugging information
- `PRESENTATION_GUIDE.md` - Presentation guidelines
- `CONTACT_PAGE_SETUP.md` - Contact page setup instructions
