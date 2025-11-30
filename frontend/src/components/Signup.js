import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => {
    // regex to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // if username is empty return error
    if (!username) {
      newErrors.username = 'Username is required';
    }

    // if email is empty return error
    if (!email) {
      newErrors.email = 'Email is required';
      // if email is not valid return error
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // if password is empty return error
    if (!password) {
      newErrors.password = 'Password is required';
      // if password is less than 7 characters return error (matches backend requirement)
    } else if (password.length < 7) {
      newErrors.password = 'Password must be at least 7 characters';
    }

    // set errors
    setErrors(newErrors);
    // if there are no errors return true and allow form to submit
    return Object.keys(newErrors).length === 0;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    // prevent default form submit
    e.preventDefault();
    
    // validate form
    if (validateForm()) {
      try {
        // call API endpoint for signup
        const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`, {
          username,
          email,
          password
        });
        
        // If signup successful, navigate to login page
        if (response.data.message === 'User created successfully.') {
          navigate('/login');
        }
      } catch (error) {
        // Handle error response
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ submit: error.response.data.message });
        } else {
          setErrors({ submit: 'Signup failed. Please try again.' });
        }
      }
    }
  };

  // the rendered form
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        {errors.submit && <div className="error">{errors.submit}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;

