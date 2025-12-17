import React, { createContext, useState, useEffect, useContext } from "react";
import { getDonorProfile } from "../services/donorService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Updated Login: Accepts the whole response object
  const login = (newToken, donorData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(donorData); // Ensure this donorData includes the 'role' field
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateProfile = (newDonorData) => {
    setUser(newDonorData);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
          const donorData = await getDonorProfile(token);
          setUser(donorData);
        } catch (error) {
          console.error("Session expired.");
          logout();
        }
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, [token]);

  const contextValue = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    loading,
    login,
    logout,
    updateProfile,
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "#cf1322" }}>
        <h3>Authenticating Secure Session...</h3>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
