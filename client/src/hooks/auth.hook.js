import { useCallback, useEffect, useState } from "react";

const storageName = "userData";
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((jjwtToken, id, name) => {
    setToken(jjwtToken);
    setUserId(id);
    setUserName(name);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jjwtToken, userName: name })
    );
  }, []);

  const logout = useCallback((storageCart) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
    localStorage.removeItem(storageCart);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, data.userName);
    }
  }, [login]);

  return { login, logout, token, userId, userName };
};
