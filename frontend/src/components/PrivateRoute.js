// src/components/PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

/**
 * A wrapper component that checks for an authentication token before rendering the child element.
 * If no token is found, it redirects the user to the login page.
 * @param {Object} props.element - The component to render if the user is authenticated (e.g., DonorProfile).
 */
const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check for the token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    // If authenticated, render the provided component
    <Component {...rest} />
  ) : (
    // If NOT authenticated, redirect to the login page
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
