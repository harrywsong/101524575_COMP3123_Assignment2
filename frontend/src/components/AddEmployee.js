import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

// add employee component
function AddEmployee() {
  // form state for new employee
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
    profile_picture: ''
  });
  // error state
  const [error, setError] = useState('');
  // navigation using react router
  const navigate = useNavigate();

  // handle form changes and update form state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle file upload and convert to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size must be less than 2MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profile_picture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    // prevent default form submit
    e.preventDefault();
    // reset error statet
    setError('');

    try {
      // call the API endpoint to add employee
      await axios.post(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEES}`, formData);
      // navigate to employees page after adding employee
      navigate('/employees');
    } catch (error) {
      // if there is an error
      if (error.response && error.response.data && error.response.data.message) {
        // set error state
        setError(error.response.data.message);
        // if there is no error then set error state as failed to add employee
      } else {
        setError('Failed to add employee. Make sure the image is less than 2MB and is an image file.');
      }
    }
  };

  // rendered form
  return (
    <div>
      <h1>Add New Employee</h1>
      <button onClick={() => navigate('/employees')}>Back to List</button>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formData.profile_picture && (
            <div>
              <img 
                src={formData.profile_picture} 
                alt="Preview" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
              />
            </div>
          )}
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;

