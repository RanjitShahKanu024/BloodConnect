import React, { useState, useEffect } from "react";
import { registerDonor } from "../services/donorService";
import FormInput from "../components/FormInput";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    city: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
    setMessage("Registering...");
    setIsError(false);
    setIsSubmitting(true);

    try {
      await registerDonor(formData);
      setMessage("Registration successful! Thank you for your contribution.");
      setIsError(false);

      // Clear form data on success
      setFormData({
        name: "",
        email: "",
        password: "",
        bloodGroup: "",
        city: "",
        phone: "",
      });
    } catch (err) {
      const errorMsg =
        err.message ||
        err.error ||
        "Error registering donor. Please check your information.";
      setMessage(errorMsg);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: isMobile ? "30px auto" : isTablet ? "35px auto" : "40px auto",
        padding: isMobile ? "20px" : isTablet ? "25px" : "30px",
        backgroundColor: "#f7f9fc",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        width: isMobile ? "90%" : "100%",
        minWidth: "0",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#00796b",
          marginBottom: isMobile ? "16px" : "20px",
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: "10px",
          fontSize: isMobile ? "1.5rem" : "1.75rem",
          fontWeight: 600,
          wordBreak: "break-word",
        }}
      >
        🩸 Donor Registration{" "}
        <small
          style={{
            fontWeight: 400,
            fontSize: isMobile ? "0.5em" : "0.6em",
            display: "block",
            color: "#546e7a",
            marginTop: "4px",
            wordBreak: "break-word",
          }}
        >
          Join the network, save a life.
        </small>
      </h2>
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
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
        />
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
          placeholder="Secure Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
        />
        <FormInput
          type="text"
          name="bloodGroup"
          placeholder="Blood Group (e.g., A+, O-)"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
        />
        <FormInput
          type="text"
          name="city"
          placeholder="City/Locality"
          value={formData.city}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
        />
        <FormInput
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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
            width: "100%",
            minWidth: "0",
            boxSizing: "border-box",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register & Donate"}
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "20px",
            padding: isMobile ? "12px" : "15px",
            backgroundColor: isError ? "#ffebee" : "#e8f5e9",
            border: `1px solid ${isError ? "#f44336" : "#4caf50"}`,
            color: isError ? "#d32f2f" : "#388e3c",
            borderRadius: "6px",
            textAlign: "center",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
            lineHeight: 1.5,
            wordBreak: "break-word",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
