import { useState } from "react";
import axios from "axios";

const usePatchData = () => {
    const [load, setLoading] = useState(false);
    const [err, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const patch = (url, id, payload, reset) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            axios
                .patch(`http://192.168.1.89:8000/${url}/${id}/`, payload)
                .then((res) => {
                    setResponse(res.data);
                    setTimeout(() => {
                        if (reset) reset();
                    }, 200);
                    // toast.success("Data has been updated successfully!")
                })
                .catch((err) => {
                    console.error("Axios PATCH error:", err);
                    setError(err);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                });
        } catch (err) {
            console.error("Unexpected PATCH error:", err);
            setTimeout(() => {
                setError(err);
                setLoading(false);
            }, 200);
        }
    };

    return { patch, load, err, response };
};

export default usePatchData;