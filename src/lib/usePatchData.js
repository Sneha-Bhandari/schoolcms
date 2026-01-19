import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://192.168.1.67:3000";

const usePatchData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = useCallback(async (id, payload) => {
    try {
      setLoading(true);
      const res = await axios.patch(`${BASE_URL}/${url}/${id}/`, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { patchData, loading, error };
};

export default usePatchData;
