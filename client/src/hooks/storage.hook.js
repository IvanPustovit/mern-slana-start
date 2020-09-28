import { useCallback } from "react";

export const useStorage = () => {
  const getStor = useCallback((storName) => {
    return JSON.parse(localStorage.getItem(storName));
  }, []);

  const setStor = useCallback((storName, data) => {
    return localStorage.setItem(storName, JSON.stringify(data));
  }, []);

  return { getStor, setStor };
};
