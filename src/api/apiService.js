import axios from 'axios';

  const createApiClient = (baseURL) => {
    const client = axios.create({
      baseURL,
      timeout: 10000,
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
          
          // Handle errors globally
          return Promise.reject(error);
        }
      );

  return client;

};
  
export default createApiClient;
  