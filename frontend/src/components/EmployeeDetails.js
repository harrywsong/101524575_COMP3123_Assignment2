import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

// employee details component
function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // fetch employee
    const fetchEmployee = async () => {
      try {
        // call the API endpoint to fetch employee
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEE_BY_ID(id)}`);
        // set employee state
        setEmployee(response.data);
        // if there is an error
      } catch (error) {
        // set error state
        setError('Failed to load employee details');
      }
    };

    // call the fetchEmployee function
    fetchEmployee();
  }, [id]);

  // if error or employee not found
  if (error || !employee) {
    // return error message and back button
    return (
      <div>
        <div>{error || 'Employee not found'}</div>
        <button onClick={() => navigate('/employees')}>Back to List</button>
      </div>
    );
  }

  // rendered employee details
  return (
    <div>
      <h1>Employee Details</h1>
      <button onClick={() => navigate('/employees')}>Back to List</button>
      <div>
        {employee.profile_picture && (
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={employee.profile_picture} 
              alt={`${employee.first_name} ${employee.last_name}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        )}
        <p><strong>ID:</strong> {employee.employee_id}</p>
        <p><strong>First Name:</strong> {employee.first_name}</p>
        <p><strong>Last Name:</strong> {employee.last_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
      </div>
      <button onClick={() => navigate(`/employees/edit/${id}`)}>Edit</button>
    </div>
  );
}

export default EmployeeDetails;

