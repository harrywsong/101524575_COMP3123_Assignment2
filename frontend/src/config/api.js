// base URL for API access (empty string uses proxy in development)
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://101524575-comp-3123-assignment1.vercel.app'
  : '';

// specific API endpoints
export const API_ENDPOINTS = {
  SIGNUP: '/api/v1/user/signup',
  LOGIN: '/api/v1/user/login',
  EMPLOYEES: '/api/v1/emp/employees',
  EMPLOYEE_BY_ID: (id) => `/api/v1/emp/employees/${id}`,
};

