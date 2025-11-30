# COMP3123 - Assignment 2

Woohyuk (Harry) Song | 101524575

Employee Management System - React Frontend Application

This is a React-based frontend application for managing employees. 
It connects to a backend API that was developed in Assignment 1 and is deployed on Vercel.

## Live Deployment

- **Frontend URL**: https://101524575-comp-3123-assignment2.vercel.app
- **Backend URL**:  https://101524575-comp-3123-assignment1.vercel.app

## Prerequisites

Before running this project, make sure the following are installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/harrywsong/101524575_COMP3123_Assignment2.git
cd 101524575_comp3123_assignment2_reactjs
```

### 2. Navigate to Frontend Directory

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

### 5. Backend API Configuration

The frontend connects to a backend API that is already deployed on Vercel:
- **Production Backend URL**: `https://101524575-comp-3123-assignment1.vercel.app`
- **Backend Repository**: [https://github.com/harrywsong/101524575_COMP3123_Assignment1](https://github.com/harrywsong/101524575_COMP3123_Assignment1)

## Technologies Used

- **React** (v19.2.0) - Frontend framework
- **React Router** (v7.9.6) - Client-side routing
- **Axios** (v1.13.2) - HTTP client for API calls
- **Vercel** - Deployment platform

## API Endpoints

The application uses the following API endpoints:

### User Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/login` - User login

### Employee Management
- `GET /api/v1/emp/employees` - Get all employees
- `GET /api/v1/emp/employees/search?department=X&position=Y` - Search employees
- `GET /api/v1/emp/employees/:id` - Get employee by ID
- `POST /api/v1/emp/employees` - Create new employee
- `PUT /api/v1/emp/employees/:id` - Update employee
- `DELETE /api/v1/emp/employees?eid=:id` - Delete employee

**Issue: Images not uploading**
- Check that image file size is under 2MB
- Ensure the file type is an image (jpg, png, gif, etc.)