import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      // if password is less than 6 characters return error
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // set errors
    setErrors(newErrors);
    // if there are no errors return true and allow form to submit
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    // prevent default form submit
    e.preventDefault();
    
    // validate form
    if (validateForm()) {
      // TODO: Add login API call here
      // Navigate to employees page after login
      navigate('/employees');
    }
  };

  // rendered form
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;

