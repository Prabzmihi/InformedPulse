import { useState } from 'react';

const useApi = (apiFunction) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async (...params) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...params);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, error, loading, fetchData };
  };
  
  export default useApi;