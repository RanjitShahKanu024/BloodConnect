import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Color constants remain the same
const colors = {
  primary: "#10B981",
  secondary: "#047857",
  dark: "#1F2937",
  white: "#FFFFFF",
  darkText: "#111827",
  accent: "#FBBF24", // Gold color for Admin link
};

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Mobile menu toggle button
  const MenuToggleButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      style={{
        background: "none",
        border: "none",
        color: colors.white,
        fontSize: "1.25rem", // Reduced from 1.5rem
        cursor: "pointer",
        padding: "4px", // Reduced from 5px
        display: isMobile ? "block" : "none",
        minWidth: "36px", // Reduced from 44px
        minHeight: "36px", // Reduced from 44px
      }}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? "✕" : "☰"}
    </button>
  );

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // FIXED: Reduced padding significantly - matches AdminDashboard compact style
        padding: "8px 16px", // Compact padding like AdminDashboard
        backgroundColor: colors.dark,
        color: colors.white,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Lighter shadow
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        //width: "1%",
        minWidth: "0",
        flexWrap: "wrap",
        position: "relative",
        height: "auto", // Let content determine height
        maxHeight: "none", // Remove max height restriction
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          margin: 0,
          // FIXED: Reduced font size significantly
          fontSize: isMobile ? "1.1rem" : "1.3rem", // Compact sizing
          fontWeight: 600,
          letterSpacing: "0.3px", // Reduced spacing
          color: colors.white,
          textDecoration: "none",
          lineHeight: 1.2,
          minWidth: "0",
          padding: "4px 0", // Minimal padding
        }}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        BloodConnect <span style={{ color: colors.primary }}>🩸</span>
      </Link>

      {/* Mobile menu toggle */}
      <MenuToggleButton />

      {/* Navigation links */}
      <nav
        style={{
          display: isMobile ? (isMenuOpen ? "flex" : "none") : "flex",
          flexDirection: isMobile ? "column" : "row",
          // FIXED: Reduced gap significantly
          gap: isMobile ? "8px" : "12px", // Compact spacing
          alignItems: "center",
          width: isMobile ? "100%" : "auto",
          // FIXED: Reduced padding
          padding: isMobile ? "12px 0" : "0", // Compact padding
          order: isMobile ? 3 : "initial",
          flex: isMobile ? "1 1 100%" : "0 1 auto",
          minWidth: "0",
          marginTop: isMobile && isMenuOpen ? "8px" : "0", // Reduced margin
        }}
      >
        {/* Public Search Link */}
        <Link
          to="/search"
          style={{
            color: colors.white,
            textDecoration: "none",
            // FIXED: Reduced font size
            fontSize: "0.875rem", // Fixed size like AdminDashboard
            // FIXED: Reduced padding significantly
            padding: "4px 8px", // Compact padding
            borderRadius: "4px",
            transition: "all 0.2s ease",
            fontWeight: "normal",
            whiteSpace: "nowrap",
            minWidth: "0",
            textAlign: "center",
            display: "block",
            lineHeight: "1.4", // Better vertical alignment
          }}
          onClick={() => isMobile && setIsMenuOpen(false)}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = colors.secondary)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Find Donor
        </Link>

        {isAuthenticated ? (
          <>
            {/* Show Admin Panel only if user role is admin */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                style={{
                  color: colors.accent,
                  textDecoration: "none",
                  fontSize: "0.875rem", // Fixed size
                  padding: "4px 8px", // Compact padding
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                  border: `1px solid ${colors.accent}`,
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  minWidth: "0",
                  textAlign: "center",
                  display: "block",
                  lineHeight: "1.4",
                }}
                onClick={() => isMobile && setIsMenuOpen(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent + "20";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {isMobile ? "Admin ⭐" : "Admin ⭐"} // Even shorter text
              </Link>
            )}

            <Link
              to="/profile"
              style={{
                color: colors.white,
                textDecoration: "none",
                fontSize: "0.875rem", // Fixed size
                padding: "4px 8px", // Compact padding
                borderRadius: "4px",
                transition: "all 0.2s ease",
                fontWeight: "normal",
                whiteSpace: "nowrap",
                minWidth: "0",
                textAlign: "center",
                display: "block",
                lineHeight: "1.4",
              }}
              onClick={() => isMobile && setIsMenuOpen(false)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = colors.secondary)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: colors.primary,
                color: colors.darkText,
                border: "none",
                // FIXED: Reduced padding
                padding: "4px 10px", // Compact padding
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.85rem", // Slightly smaller
                fontWeight: "bold",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                minWidth: "0",
                textAlign: "center",
                display: "block",
                width: isMobile ? "100%" : "auto",
                lineHeight: "1.4",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = colors.secondary;
                e.currentTarget.style.color = colors.white;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = colors.darkText;
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              style={{
                color: colors.white,
                textDecoration: "none",
                fontSize: "0.875rem", // Fixed size
                padding: "4px 8px", // Compact padding
                borderRadius: "4px",
                transition: "all 0.2s ease",
                fontWeight: "normal",
                whiteSpace: "nowrap",
                minWidth: "0",
                textAlign: "center",
                display: "block",
                lineHeight: "1.4",
              }}
              onClick={() => isMobile && setIsMenuOpen(false)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = colors.secondary)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{
                color: colors.white,
                textDecoration: "none",
                fontSize: "0.875rem", // Fixed size
                padding: "4px 8px", // Compact padding
                borderRadius: "4px",
                transition: "all 0.2s ease",
                fontWeight: "normal",
                whiteSpace: "nowrap",
                minWidth: "0",
                textAlign: "center",
                display: "block",
                lineHeight: "1.4",
              }}
              onClick={() => isMobile && setIsMenuOpen(false)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = colors.secondary)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
