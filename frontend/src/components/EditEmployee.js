import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

// edit employee component
function EditEmployee() {
  // form state
  const { id } = useParams();
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

  useEffect(() => {
    // fetch employee
    const fetchEmployee = async () => {
      try {
        // call the API endpoint to fetch employee
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEE_BY_ID(id)}`);
        // set employee state
        const emp = response.data;
        setFormData({
          first_name: emp.first_name,
          last_name: emp.last_name,
          email: emp.email,
          position: emp.position,
          salary: emp.salary.toString(),
          date_of_joining: new Date(emp.date_of_joining).toISOString().split('T')[0],
          department: emp.department,
          profile_picture: emp.profile_picture || ''
        });
        // if there is an error
      } catch (error) {
        // set error state
        setError('Failed to load employee');
      }
    };

    // fetch employee 
    fetchEmployee();
  }, [id]);

  // handle form changes and update form state
  const handleChange = (e) => {
    // update form state
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
    // reset error state to empty
    setError('');

    try {
      // call the API endpoint to update employee
      await axios.put(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEE_BY_ID(id)}`, formData);
      // navigate to employees page after updating employee
      navigate('/employees');
    } catch (error) {
      // if there is an error
      if (error.response && error.response.data && error.response.data.message) {
        // set error state
        setError(error.response.data.message);
        // if there is no error then set error state as failed to update employee
      } else {
        setError('Failed to update employee');
      }
    }
  };

  // rendered form
  return (
    <div>
      <h1>Edit Employee</h1>
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
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;

