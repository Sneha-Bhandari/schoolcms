import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://192.168.1.67:3000";

const usePostData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/${url}/`, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { postData, loading, error };
};

export default usePostData;
