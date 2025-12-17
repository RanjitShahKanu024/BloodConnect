import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsSmallMobile(width < 480); // Extra small devices
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#263238",
        color: "#b0bec5",
        padding: isSmallMobile
          ? "20px 12px"
          : isMobile
          ? "24px 16px"
          : isTablet
          ? "32px 24px"
          : "40px 30px",
        marginTop: "60px",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        borderTop: "5px solid #d32f2f",
        width: "100%",
        minWidth: "0",
        boxSizing: "border-box", // FIXED: Ensures padding is included in width
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-start",
          flexWrap: "wrap",
          gap: isSmallMobile
            ? "16px"
            : isMobile
            ? "20px"
            : isTablet
            ? "25px"
            : "30px",
          width: "100%",
          minWidth: "0",
          boxSizing: "border-box", // FIXED
        }}
      >
        {/* 1. Logo and Mission */}
        <div
          style={{
            flex: isMobile ? "1 1 100%" : "1",
            minWidth: "0",
            marginBottom: isMobile ? "16px" : "0",
            width: "100%",
            boxSizing: "border-box", // FIXED
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: isSmallMobile
                ? "1.2rem"
                : isMobile
                ? "1.4rem"
                : isTablet
                ? "1.6rem"
                : "1.8rem",
              fontWeight: 600,
              color: "white",
              marginBottom: "10px",
              textDecoration: "none",
              display: "block",
              lineHeight: 1.2,
              wordBreak: "break-word", // FIXED: Allow text to wrap
            }}
          >
            BloodConnect <span style={{ color: "#d32f2f" }}>🩸</span>
          </Link>
          <p
            style={{
              marginTop: "10px",
              fontSize: isSmallMobile
                ? "0.8rem"
                : isMobile
                ? "0.9rem"
                : "0.95rem",
              lineHeight: 1.6,
              wordBreak: "break-word", // FIXED: Prevent text overflow
            }}
          >
            Connecting donors and recipients instantly to save lives across the
            nation. Your voluntary action makes a difference.
          </p>
        </div>

        {/* 2. Quick Links - FIXED HORIZONTAL/VERTICAL ALIGNMENT */}
        <div
          style={{
            flex: isMobile ? "1 1 100%" : "1",
            minWidth: "0",
            marginBottom: isMobile ? "16px" : "0",
            width: "100%",
            boxSizing: "border-box", // FIXED
          }}
        >
          <h4
            style={{
              fontSize: isSmallMobile ? "0.9rem" : isMobile ? "1rem" : "1.2rem",
              color: "#ffffff",
              marginBottom: "12px",
              borderBottom: "1px solid #37474f",
              paddingBottom: "5px",
              fontWeight: 600,
              wordBreak: "break-word", // FIXED
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: isSmallMobile
                ? "column"
                : isMobile
                ? "row"
                : "column", // FIXED: Column on very small, row on regular mobile
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: isSmallMobile ? "6px" : isMobile ? "12px" : "8px", // FIXED: Smaller gap for small screens
              width: "100%",
              minWidth: "0",
            }}
          >
            <li
              style={{
                marginBottom: isSmallMobile ? "6px" : isMobile ? "0" : "8px",
                minWidth: "0",
                flexShrink: isMobile ? 1 : 0, // FIXED: Allow shrinking on mobile
              }}
            >
              <Link
                to="/search"
                style={{
                  color: "#b0bec5",
                  textDecoration: "none",
                  fontSize: isSmallMobile
                    ? "0.8rem"
                    : isMobile
                    ? "0.85rem"
                    : "0.95rem",
                  transition: "color 0.2s",
                  display: "block",
                  whiteSpace: isSmallMobile ? "normal" : "nowrap", // FIXED: Allow wrapping on very small screens
                  wordBreak: "break-word", // FIXED
                  minWidth: "0",
                  padding: isSmallMobile ? "2px 0" : "0", // FIXED: Add small padding for touch
                }}
                onMouseOver={(e) => (e.target.style.color = "#d32f2f")}
                onMouseOut={(e) => (e.target.style.color = "#b0bec5")}
              >
                Find Donor
              </Link>
            </li>
            <li
              style={{
                marginBottom: isSmallMobile ? "6px" : isMobile ? "0" : "8px",
                minWidth: "0",
                flexShrink: isMobile ? 1 : 0, // FIXED
              }}
            >
              <Link
                to="/register"
                style={{
                  color: "#b0bec5",
                  textDecoration: "none",
                  fontSize: isSmallMobile
                    ? "0.8rem"
                    : isMobile
                    ? "0.85rem"
                    : "0.95rem",
                  transition: "color 0.2s",
                  display: "block",
                  whiteSpace: isSmallMobile ? "normal" : "nowrap", // FIXED
                  wordBreak: "break-word", // FIXED
                  minWidth: "0",
                  padding: isSmallMobile ? "2px 0" : "0",
                }}
                onMouseOver={(e) => (e.target.style.color = "#d32f2f")}
                onMouseOut={(e) => (e.target.style.color = "#b0bec5")}
              >
                Register to Donate
              </Link>
            </li>
            <li
              style={{
                marginBottom: isSmallMobile ? "6px" : isMobile ? "0" : "8px",
                minWidth: "0",
                flexShrink: isMobile ? 1 : 0, // FIXED
              }}
            >
              <Link
                to="/profile"
                style={{
                  color: "#b0bec5",
                  textDecoration: "none",
                  fontSize: isSmallMobile
                    ? "0.8rem"
                    : isMobile
                    ? "0.85rem"
                    : "0.95rem",
                  transition: "color 0.2s",
                  display: "block",
                  whiteSpace: isSmallMobile ? "normal" : "nowrap", // FIXED
                  wordBreak: "break-word", // FIXED
                  minWidth: "0",
                  padding: isSmallMobile ? "2px 0" : "0",
                }}
                onMouseOver={(e) => (e.target.style.color = "#d32f2f")}
                onMouseOut={(e) => (e.target.style.color = "#b0bec5")}
              >
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Contact Info */}
        <div
          style={{
            flex: isMobile ? "1 1 100%" : "1",
            minWidth: "0",
            width: "100%",
            boxSizing: "border-box", // FIXED
          }}
        >
          <h4
            style={{
              fontSize: isSmallMobile ? "0.9rem" : isMobile ? "1rem" : "1.2rem",
              color: "#ffffff",
              marginBottom: "12px",
              borderBottom: "1px solid #37474f",
              paddingBottom: "5px",
              fontWeight: 600,
              wordBreak: "break-word", // FIXED
            }}
          >
            Contact & Support
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: isSmallMobile
                  ? "0.8rem"
                  : isMobile
                  ? "0.85rem"
                  : "0.95rem",
                lineHeight: 1.5,
                wordBreak: "break-word", // FIXED
              }}
            >
              Email: support@bloodconnect.org
            </p>
            <p
              style={{
                margin: 0,
                fontSize: isSmallMobile
                  ? "0.8rem"
                  : isMobile
                  ? "0.85rem"
                  : "0.95rem",
                lineHeight: 1.5,
                wordBreak: "break-word", // FIXED
              }}
            >
              Phone: +1 (555) 123-4567
            </p>
            <p
              style={{
                margin: "15px 0 0 0",
                fontSize: isSmallMobile
                  ? "0.8rem"
                  : isMobile
                  ? "0.85rem"
                  : "0.95rem",
                lineHeight: 1.5,
                wordBreak: "break-word", // FIXED
              }}
            >
              Location: , Bharatpur
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          marginTop: isSmallMobile
            ? "16px"
            : isMobile
            ? "20px"
            : isTablet
            ? "25px"
            : "30px",
          borderTop: "1px solid #37474f",
          fontSize: isSmallMobile ? "0.75rem" : isMobile ? "0.8rem" : "0.9rem",
          color: "#78909c",
          width: "100%",
          minWidth: "0",
          boxSizing: "border-box", // FIXED
          wordBreak: "break-word", // FIXED
        }}
      >
        &copy; {new Date().getFullYear()} BloodConnect Network. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
