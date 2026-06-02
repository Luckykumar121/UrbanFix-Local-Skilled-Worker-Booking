# UrbanFix – Local Skilled Worker Booking System

## Project Introduction

---

## **Project Overview**

UrbanFix is a web-based platform that connects skilled workers with customers in urban areas who need their services. It solves the problem of finding reliable and trustworthy skilled workers by providing a centralized digital marketplace with transparent pricing, real-time booking, and professional profile management.

---

## **Problem Addressed**

- Difficulty finding reliable skilled workers in urban areas
- Lack of transparency in pricing and availability
- No centralized system for worker scheduling and booking
- Customers have no way to verify worker quality or experience
- Workers lack a digital platform to showcase their services

---

## **User Types**

1. **Customers** - Browse, search, and book skilled workers
2. **Workers** - Register their services, manage bookings, and maintain profiles
3. **Administrators** - Manage the platform, oversee users, and maintain quality

---

## **Service Categories Offered**

- Electrician
- Carpenter
- AC Repairing
- Painting
- Mechanics
- Plumber

---

## **Key Features Implemented**

### **Authentication & User Management**

- Secure registration and login with email verification
- Separate login systems for customers and workers
- Password encryption using bcrypt
- JWT token-based authentication

### **Worker Search & Discovery**

- Category-wise worker filtering
- Budget-based worker selection (search within price range)
- Browse all workers on the platform
- View detailed worker profiles

### **Booking System**

- Real-time booking confirmation
- Track active and historical bookings
- Request management system for workers
- Instant service bookings

### **Dashboards**

- Customer Dashboard - View bookings and worker details
- Worker Dashboard - Manage availability and view incoming bookings
- Admin Dashboard - Platform oversight and management

### **Communication**

- Contact page with form validation
- Email notifications using Nodemailer
- FAQ accordion section
- Social media links

### **User Profiles**

- Customer profile management and booking history
- Worker profile creation and skill management
- Update worker availability

---

## **Technology Stack**

### **Frontend:**

- React.js with Vite
- Tailwind CSS for styling
- Bootstrap for responsive components
- Framer Motion for animations
- React Router for navigation

### **Backend:**

- Node.js runtime
- Express.js framework
- REST API architecture
- Nodemailer for email services

### **Database:**

- MongoDB for data storage
- Mongoose for object modeling

### **Security & Validation:**

- JWT for authentication
- Bcrypt/Bcryptjs for password hashing
- Joi for input validation
- CORS enabled for security

### **Development Tools:**

- Nodemon for development server
- npm for package management
- Postman for API testing

---

## **API Routes**

| Route      | Purpose                              |
| ---------- | ------------------------------------ |
| `/auth`    | User authentication and registration |
| `/workers` | Worker profiles and management       |
| `/admin`   | Administrative functions             |
| `/contact` | Contact form submissions             |

---

## **System Architecture**

UrbanFix follows a **three-tier architecture**:

1. **Presentation Tier (Frontend)** - React.js-based responsive UI
2. **Application Tier (Backend)** - Express.js REST API server
3. **Data Tier** - MongoDB database

---

## **Current Project Status**

### ✅ **Completed Features**

- Core booking system
- User authentication and authorization
- Worker search and filtering
- Real-time booking management
- Contact page with email notifications
- Admin dashboard setup
- Customer and Worker dashboards
- Category-wise worker browsing

### ⏳ **In Development / Pending Features**

- Payment gateway integration
- Review and rating system
- Advanced notification system
- Analytics and reporting
- Hourly pricing system implementation

---

## **Project Information**

**Student Name:** Lucky Kumar  
**Roll Number:** 231872010034  
**Course:** BCA (Bachelor of Computer Applications)  
**Semester:** 6th Semester  
**Institution:** Ramdoot College of Education, Randevi-187  
**Project Title:** UrbanFix – Local Skilled Worker Booking System

---

## **Key Technologies Summary**

| Layer             | Technologies                                        |
| ----------------- | --------------------------------------------------- |
| **Frontend**      | React, Vite, Tailwind CSS, Bootstrap, Framer Motion |
| **Backend**       | Node.js, Express.js                                 |
| **Database**      | MongoDB, Mongoose                                   |
| **Security**      | JWT, Bcrypt, Joi Validation                         |
| **Communication** | Nodemailer                                          |

---

_This comprehensive platform provides a complete solution for connecting skilled workers with customers in need of their services._
