import createApiClient from './apiService';
import apiClient from './apiService';
import endpoints from './endpoints';

const mainApiClient = createApiClient(import.meta.env.VITE_API_BASE_URL);
const authApiClient = createApiClient(import.meta.env.VITE_API_AUTH_URL);

export const fetchNews = async () => {
    try {
      const response = await authApiClient.get(endpoints.FETCH_NEWS);
      return response.data.recommendations;
    } catch (error) {
      throw error;
    }
  };

  export const userLogin = async (credentials) => {
    try {
      const response = await authApiClient.post(endpoints.LOGIN_USER, credentials);
      return response.data;
    } catch (error) {
      console.log("Error :", error)

      if(error.status === 401){
        alert("Username or Password Error")
      }
    }
  };

  export const userLogout = async () => {
    try {
      const response = await authApiClient.post(endpoints.LOGOUT);
      return response.data;
    } catch (error) {
      console.log("Error on logout:", error)
    }
  };

  export const addInterest = async (requestBody) => {
    try {
      const response = await authApiClient.post(endpoints.ADD_INTEREST, requestBody);
      return response.data;
    } catch (error) {
      console.log("Error on add interaction :", error)
    }
  }

  export const removeInterest = async (requestBody) => {
    try {
      const response = await authApiClient.delete(endpoints.REMOVE_INTEREST, {
        data: requestBody
      });
      return response.data;
    } catch (error) {
      console.log("Error on add interaction :", error)
    }
  }

  export const userRegister = async (requestBody) => {
    try {
      const response = await authApiClient.post(endpoints.USER_REGISTRATION, requestBody);
      return response.data;
    } catch (error) {
      console.log("Error on user registration :", error)
    }
  }

  export const getLatestNews = async () => {
    try {
      const response = await mainApiClient.get(endpoints.LATEST_NEWS);
      return response.data;
    } catch (error) {
      console.log("Error on user registration :", error)
    }
  }