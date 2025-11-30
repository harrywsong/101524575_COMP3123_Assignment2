import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in using token
    const token = localStorage.getItem('token');
    // if there is no token, redirect to login since this means the user is not logged in
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch employees from API
    const fetchEmployees = async () => {
      try {
        // call the API endpoint to fetch employees
        const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEES}`);
        // set employees state
        setEmployees(response.data);
        // set loading to false
        setLoading(false);
        // if there is an error
      } catch (error) {
        // set error state
        setError('Failed to load employees');
        // set loading to false
        setLoading(false);
      }
    };

    // call the fetchEmployees function
    fetchEmployees();
    // add the navigate function as a dependency
  }, [navigate]);

  const handleLogout = () => {
    // remove token from local storage on logout
    localStorage.removeItem('token');
    navigate('/login');
  };

  // if loading is true return loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // if error is true return error message
  if (error) {
    return <div>{error}</div>;
  }

  // rendered form
  return (
    <div>
      <h1>Employee List</h1>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Add New Employee</button>
    </div>
  );
}

export default EmployeeList;

