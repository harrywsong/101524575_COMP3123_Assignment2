import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({
    department: '',
    position: ''
  });
  const [isSearching, setIsSearching] = useState(false);
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
        // if there is an error
      } catch (error) {
        // set error state
        setError('Failed to load employees');
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

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEES}?eid=${employeeId}`);
        // Refresh the employee list based on current search state
        if (isSearching) {
          handleSearch();
        } else {
          const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEES}`);
          setEmployees(response.data);
        }
      } catch (error) {
        alert('Failed to delete employee');
      }
    }
  };

  // Handle search form input changes
  const handleSearchChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value
    });
  };

  // Handle search submission
  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // Check if at least one search criteria is provided (trim whitespace)
    const department = searchCriteria.department.trim();
    const position = searchCriteria.position.trim();
    
    if (!department && !position) {
      setError('Please enter at least one search criteria (department or position)');
      return;
    }

    setError('');
    setIsSearching(true);

    try {
      // Build query parameters (only include non-empty values)
      const params = new URLSearchParams();
      if (department) {
        params.append('department', department);
      }
      if (position) {
        params.append('position', position);
      }

      // Call the search API endpoint
      const url = `${API_BASE_URL}${API_ENDPOINTS.EMPLOYEES_SEARCH}?${params.toString()}`;
      console.log('Search URL:', url);
      const response = await axios.get(url);
      console.log('Search response:', response.data);
      
      // Format the response to ensure employee_id exists (in case search returns different structure)
      const formattedEmployees = response.data.map(emp => ({
        ...emp,
        employee_id: emp.employee_id || (emp._id ? emp._id.toString() : null) || emp.id || null
      }));
      
      setEmployees(formattedEmployees);
      
      if (formattedEmployees.length === 0) {
        setError('No employees found matching the search criteria');
      }
    } catch (error) {
      console.error('Search error details:', error);
      console.error('Error response:', error.response?.data);
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError(`Error: ${JSON.stringify(error.response.data)}`);
        }
      } else {
        setError('Failed to search employees. Please try again.');
      }
    }
  };

  // Handle clear search - reset to show all employees
  const handleClearSearch = async () => {
    setSearchCriteria({
      department: '',
      position: ''
    });
    setIsSearching(false);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.EMPLOYEES}`);
      setEmployees(response.data);
    } catch (error) {
      setError('Failed to load employees');
    }
  };

  // rendered form
  return (
    <div>
      <div className="page-header">
        <h1>Employee List</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="search-form">
        <h2>Search Employees</h2>
        <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            id="department"
            type="text"
            name="department"
            value={searchCriteria.department}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            type="text"
            name="position"
            value={searchCriteria.position}
            onChange={handleSearchChange}
          />
        </div>
        <button type="submit">Search</button>
        {isSearching && (
          <button type="button" className="btn-secondary" onClick={handleClearSearch}>Clear Search</button>
        )}
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      <table>
      <thead>
          <tr>
            <th>Picture</th>
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
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9">No employees found</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>
                  {employee.profile_picture ? (
                    <img 
                      src={employee.profile_picture} 
                      alt={employee.first_name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#ddd', borderRadius: '50%' }}></div>
                  )}
                </td>
                <td>{employee.employee_id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>
                  <div className="employee-actions">
                    <button onClick={() => navigate(`/employees/view/${employee.employee_id}`)}>View</button>
                    <button onClick={() => navigate(`/employees/edit/${employee.employee_id}`)}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDelete(employee.employee_id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button onClick={() => navigate('/employees/add')}>Add New Employee</button>
    </div>
  );
}

export default EmployeeList;

