import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    setIsAuthenticated(!!token && !!user);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return { isAuthenticated, setIsAuthenticated,checkAuthentication };
};
