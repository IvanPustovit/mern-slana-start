import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "POST", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "ERROR FETCH");
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const getMethod = useCallback(async (url, method = "GET") => {
    setLoading(true);
    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "ERROR FETCH");
      }
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  // const getIdItem = useCallback(async (url, method = "GET") => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(url, { method });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.message || "ERROR FETCH");
  //     }
  //     setLoading(false);
  //     return data;
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error.message);
  //     throw error;
  //   }
  // }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError, getMethod };
};
