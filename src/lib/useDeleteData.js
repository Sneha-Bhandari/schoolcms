// Lib/DeleteData.js or Lib/useDeleteData.js
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useDeleteData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const deleteData = (url) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      axios
        .delete(`http://192.168.1.89:8000/${url}`)
        .then((res) => {
          setResponse(res.data);
          toast.error('data has been deleted')
        })
        .catch((err) => {
          console.error("DELETE error:", err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error("Unexpected DELETE error:", err);
      setError(err);
      setLoading(false);
    }
  };

  return { deleteData, loading, error, response };
};

export default useDeleteData;