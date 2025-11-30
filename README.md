# COMP3123 - Assignment 2

Woohyuk (Harry) Song | 101524575

Employee Management System - React Frontend Application

This is a React-based frontend application for managing employees. 
It connects to a backend API that was developed in Assignment 1 and is deployed on Vercel.

## Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js) or **yarn**

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
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

### 5. Backend API

The frontend connects to a backend API that is already deployed on Vercel:
- **Production Backend URL**: `https://101524575-comp-3123-assignment1.vercel.app`
- **Backend Repository**: [https://github.com/harrywsong/101524575_COMP3123_Assignment1](https://github.com/harrywsong/101524575_COMP3123_Assignment1)

In development mode, the app uses a proxy configured in `package.json` to connect to the backend API. No additional backend setup is required for local development.


## Technologies Used

- **React** - Frontend framework
- **React Router** - Routing
- **Axios** - HTTP client for API calls

## API Endpoints

The application uses the following API endpoints:

- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/emp/employees` - Get all employees
- `GET /api/v1/emp/employees/search` - Search employees
- `GET /api/v1/emp/employees/:id` - Get employee by ID
- `POST /api/v1/emp/employees` - Create new employee
- `PUT /api/v1/emp/employees/:id` - Update employee
- `DELETE /api/v1/emp/employees?eid=:id` - Delete employee