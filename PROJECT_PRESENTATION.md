---
marp: true
theme: default
size: 16:9
paginate: true
backgroundColor: #fff
style: |
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 60px;
  }
  h1 {
    color: #2c3e50;
    font-size: 3.5em;
    margin-bottom: 20px;
  }
  h2 {
    color: #34495e;
    font-size: 2.5em;
    border-bottom: 3px solid #3498db;
    padding-bottom: 15px;
  }
  li {
    font-size: 1.3em;
    margin-bottom: 15px;
  }
  p {
    font-size: 1.2em;
    line-height: 1.6;
  }
---

# 🏗️ UrbanFix

## Local Skilled Worker Booking System

**Student:** Lucky Kumar  
**Roll No:** 231872010034  
**Course:** BCA (6th Semester)  
**Institution:** Ramdoot College of Education, Randevi-187

---

# 📋 Slide Overview

This presentation covers:

1. Project Overview
2. Problem Statement
3. Solution & Objectives
4. User Types
5. Service Categories
6. Key Features - Part 1
7. Key Features - Part 2
8. Dashboard Features
9. Technology Stack - Frontend
10. Technology Stack - Backend & Database
11. System Architecture
12. API Routes & Integration
13. Security & Authentication
14. Current Status & Roadmap
15. Conclusion & Impact

---

# 1️⃣ Project Overview

**UrbanFix** is a comprehensive web-based platform that bridges the gap between skilled workers and customers in need of their services.

### What is it?

- Digital marketplace for skilled labor services
- Centralized platform for worker discovery
- Real-time booking and management system
- Quality assurance through profiles and tracking

### Why UrbanFix?

- Solves urban labor market inefficiencies
- Provides transparency and reliability
- Enables professional worker management
- Creates seamless customer experience

---

# 2️⃣ Problem Statement

### Traditional Challenges:

- ❌ Finding reliable skilled workers is difficult
- ❌ No centralized platform for booking
- ❌ Lack of transparency in pricing
- ❌ No quality assurance mechanism
- ❌ Workers have no digital presence
- ❌ No scheduling efficiency

### Impact:

Customers waste time and money, workers lack opportunities, and the market remains unorganized and inefficient.

---

# 3️⃣ Solution & Objectives

### Our Solution:

Create a digital platform that connects workers and customers efficiently

### Project Objectives:

✅ Develop user-friendly booking platform  
✅ Implement secure authentication  
✅ Create efficient worker search system  
✅ Establish reliable booking & scheduling  
✅ Provide admin tools for management  
✅ Ensure data security & privacy

---

# 4️⃣ User Types

### Three Main User Categories:

**👤 Customers**

- Browse and search for workers
- Book services based on budget
- Manage bookings and profiles
- Contact workers and support

**🔧 Workers**

- Register and showcase skills
- Manage availability
- Receive booking requests
- Update service details

**⚙️ Administrators**

- Oversee platform operations
- Manage users and workers
- Handle disputes and quality
- View analytics and reports

---

# 5️⃣ Service Categories

### Six Core Service Categories:

1. **⚡ Electrician** - Electrical installations and repairs
2. **🪛 Carpenter** - Woodwork and furniture services
3. **❄️ AC Repairing** - Air conditioning maintenance
4. **🎨 Painting** - Interior and exterior painting
5. **🔩 Mechanics** - Automotive and mechanical repairs
6. **🚰 Plumber** - Plumbing installations and maintenance

Each category has dedicated workers with specific expertise.

---

# 6️⃣ Key Features - Part 1

### Authentication & User Management:

✅ Secure registration and login  
✅ Email verification system  
✅ Separate login for customers & workers  
✅ Password encryption with bcrypt  
✅ JWT token-based authentication

### Worker Search & Discovery:

✅ Category-wise filtering  
✅ Budget-based worker selection  
✅ Browse all workers  
✅ View detailed profiles

---

# 7️⃣ Key Features - Part 2

### Booking System:

✅ Real-time booking confirmation  
✅ Track active bookings  
✅ Historical booking records  
✅ Request management for workers  
✅ Instant service confirmation

### User Profiles:

✅ Customer profile management  
✅ Booking history tracking  
✅ Worker skill management  
✅ Availability updates

---

# 8️⃣ Dashboard Features

### Customer Dashboard:

- View all bookings (active & completed)
- Worker profile details
- Booking history
- Request status tracking

### Worker Dashboard:

- Incoming booking requests
- Manage availability
- View customer details
- Track earnings

### Admin Dashboard:

- User management
- Platform analytics
- Quality monitoring
- System oversight

---

# 9️⃣ Technology Stack - Frontend

### Frontend Technologies:

- **React.js** - Component-based UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Bootstrap** - Responsive components
- **Framer Motion** - Smooth animations
- **React Router** - Navigation
- **HTML5 & CSS3** - Semantic markup
- **JavaScript (ES6+)** - Client-side logic

### Why These?

Fast loading, responsive design, smooth animations, better UX.

---

# 🔟 Technology Stack - Backend & Database

### Backend Technologies:

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **REST API** - Standard API architecture
- **Nodemailer** - Email notifications

### Database:

- **MongoDB** - NoSQL database
- **Mongoose** - Object modeling

### Security & Validation:

- **JWT** - Token authentication
- **Bcrypt/Bcryptjs** - Password hashing
- **Joi** - Input validation
- **CORS** - Security headers

---

# 1️⃣1️⃣ System Architecture

### Three-Tier Architecture:

```
┌─────────────────────────────────┐
│   Presentation Tier (Frontend)  │
│   React.js Responsive UI        │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│  Application Tier (Backend)     │
│  Express.js REST API Server     │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│    Data Tier (Database)         │
│    MongoDB NoSQL Database       │
└─────────────────────────────────┘
```

---

# 1️⃣2️⃣ API Routes & Integration

### Main API Routes:

| Route      | Purpose                      |
| ---------- | ---------------------------- |
| `/auth`    | User registration & login    |
| `/workers` | Worker profiles & management |
| `/admin`   | Administrative functions     |
| `/contact` | Contact form & emails        |

### Features:

- CORS enabled for security
- JSON request/response
- Error handling
- Email notifications via Nodemailer

---

# 1️⃣3️⃣ Security & Authentication

### Security Measures:

✅ **Password Security**

- Bcrypt encryption (rounds: 10)
- No plaintext storage

✅ **Authentication**

- JWT tokens with expiry
- Role-based access control

✅ **Input Validation**

- Joi schema validation
- Request sanitization

✅ **API Security**

- CORS protection
- Rate limiting ready
- Environment variables for secrets

---

# 1️⃣4️⃣ Current Status & Roadmap

### ✅ Completed Features:

- User authentication system
- Worker search & filtering
- Real-time booking system
- Dashboards (Customer, Worker, Admin)
- Contact page with emails
- Category browsing

### 🚀 In Development:

- Payment gateway integration
- Review & rating system
- Advanced notifications
- Analytics & reporting
- Hourly pricing implementation

---

# 1️⃣5️⃣ Conclusion & Impact

### Project Impact:

🎯 Connects skilled workers with customers efficiently  
🎯 Provides transparent pricing system  
🎯 Ensures quality through profiles & tracking  
🎯 Creates professional platform for workers  
🎯 Revolutionizes urban labor market

### Future Vision:

Scale to other cities, add payment systems, implement AI-based worker matching, and create mobile applications.

**UrbanFix - Making skilled labor accessible to everyone!**

---
