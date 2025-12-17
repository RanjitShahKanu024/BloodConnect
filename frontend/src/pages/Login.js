// src/pages/Login.js (FULL CODE - Refactored with FormInput)

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginDonor } from "../services/donorService";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    setIsSubmitting(true);

    try {
      const { token, donor } = await loginDonor(formData);

      login(token, donor);

      setMessage("Login successful! Redirecting to profile...");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      const errorMsg =
        err.message || err.error || "Login failed. Check your credentials.";
      setMessage(errorMsg);
      console.error("Login Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: isMobile
          ? "60px auto 30px"
          : isTablet
          ? "70px auto 35px"
          : "80px auto 40px",
        padding: isMobile ? "20px" : isTablet ? "25px" : "30px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        borderTop: "5px solid #00796b",
        textAlign: "center",
        width: isMobile ? "90%" : "100%",
        minWidth: "0",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "#d32f2f",
          marginBottom: isMobile ? "20px" : "25px",
          fontSize: isMobile ? "1.5rem" : "1.75rem",
          fontWeight: 600,
          wordBreak: "break-word",
        }}
      >
        Donor Login 🔑
      </h2>

      {message && (
        <p
          style={{
            marginTop: "20px",
            padding: isMobile ? "8px 12px" : "10px",
            borderRadius: "6px",
            backgroundColor: "#fff3e0",
            color: "#ff9800",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
            lineHeight: 1.5,
            wordBreak: "break-word",
          }}
        >
          {message}
        </p>
      )}

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "12px" : "15px",
          width: "100%",
          minWidth: "0",
        }}
        onSubmit={handleSubmit}
      >
        <FormInput
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            padding: isMobile ? "10px 16px" : "12px 20px",
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginTop: "10px",
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </button>
      </form>

      <p
        style={{
          marginTop: "20px",
          fontSize: isMobile ? "0.85rem" : "0.9rem",
          lineHeight: 1.5,
          wordBreak: "break-word",
        }}
      >
        New Donor?{" "}
        <Link
          to="/register"
          style={{
            color: "#00796b",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
          }}
        >
          Register Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
