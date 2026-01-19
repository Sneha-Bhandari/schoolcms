import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      axios
        .get(`http://192.168.1.67:3000/${url}`)

        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.error("Axios GET error:", err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error("Unexpected error in GET request:", err);
      setError(err);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useGetData;