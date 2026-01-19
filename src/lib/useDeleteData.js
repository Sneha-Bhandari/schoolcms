import { useState, useCallback } from "react";
import axios from "axios";

const useDeleteData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (id) => {
    if (!url || !id) return;

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://192.168.1.67:3000/${url}/${id}/`);
      return true;
    } catch (err) {
      console.error("DELETE error:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { deleteData, loading, error };
};

export default useDeleteData;
