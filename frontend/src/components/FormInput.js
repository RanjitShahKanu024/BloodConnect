// src/components/FormInput.js (FULL CODE)

import React from "react";

// --- Reusable Input Styles ---
const styles = {
  input: {
    padding: "12px 15px",
    border: "1px solid #b0bec5", // Subtle border
    borderRadius: "6px",
    fontSize: "16px",
    width: "100%", // Take full width of parent container
    boxSizing: "border-box", // Include padding/border in width
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  inputFocus: {
    borderColor: "#00796b", // Teal/Medical green on focus
    boxShadow: "0 0 0 3px rgba(0, 121, 107, 0.2)",
    outline: "none",
  },
};

/**
 * Reusable component for form inputs with professional, themed styling.
 * Handles state for focus/blur effects.
 */
const FormInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Combine base style with focus style when needed
  const inputStyle = isFocused
    ? { ...styles.input, ...styles.inputFocus }
    : styles.input;

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={inputStyle}
    />
  );
};

export default FormInput;
