import axios from 'axios';

  const createApiClient = (baseURL) => {
    const client = axios.create({
      baseURL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptors for request and response
    client.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('access_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      client.interceptors.response.use(
        (response) => response,
        (error) => {

          // Check if the error response is a 401 Unauthorized
          if (error.response && error.response.status === 401) {
            // Clear tokens from localStorage
            localStorage.removeItem('access_token');
            
            // Redirect to login page or handle logout logic
            window.location.href = '/login'; // Adjust the path based on your routing
          }
          
          // Handle errors globally
          return Promise.reject(error);
        }
      );

  return client;

};
  
export default createApiClient;
  