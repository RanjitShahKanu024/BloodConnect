// src/pages/Home.js (FULLY RESPONSIVE DESIGN)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Professional Blood Donation Background Images
const BACKGROUND_IMAGES = {
  hero: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  pattern:
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
};

// Color Palette
const colors = {
  primary: "#10B981",
  secondary: "#047857",
  dark: "#1F2937",
  lightBg: "#F0FDF4",
  white: "#FFFFFF",
  darkText: "#111827",
  grayText: "#6B7280",
  accent: "#059669",
};

// Icons
const DropletIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const UsersIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const HeartIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const ShieldIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ArrowRightIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Base Styles
const baseStyles = {
  // Base container
  container: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: colors.lightBg,
    color: colors.darkText,
    overflowX: "hidden",
    width: "100%",
    minHeight: "100vh",
  },

  // Hero Section
  heroSection: {
    minHeight: "100vh",
    backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.85), rgba(4, 120, 87, 0.75)), url(${BACKGROUND_IMAGES.hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(40px, 8vw, 120px) clamp(20px, 5vw, 40px)",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  heroContent: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.2,
    color: colors.white,
    marginBottom: "clamp(16px, 3vw, 24px)",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    wordBreak: "break-word",
  },

  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.9)",
    maxWidth: "800px",
    margin: "0 auto clamp(32px, 5vw, 48px)",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
    padding: "0 10px",
  },

  // CTA Buttons Container
  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    maxWidth: "600px",
    margin: "0 auto",
    width: "100%",
  },

  // Buttons
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "clamp(12px, 2.5vw, 18px) clamp(20px, 3vw, 40px)",
    borderRadius: "50px",
    fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.3s ease",
    width: "100%",
    maxWidth: "320px",
    border: "2px solid transparent",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    textAlign: "center",
  },

  primaryButton: {
    backgroundColor: colors.dark,
    color: colors.white,
    borderColor: colors.dark,
  },

  secondaryButton: {
    backgroundColor: colors.white,
    color: colors.dark,
    borderColor: colors.white,
  },

  // Stats Section
  statsSection: {
    padding: "clamp(40px, 8vw, 80px) clamp(15px, 4vw, 40px)",
    backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.95), rgba(240, 253, 244, 0.95)), url(${BACKGROUND_IMAGES.pattern})`,
    backgroundSize: "cover",
    marginTop: "-60px",
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
  },

  statsContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    width: "100%",
  },

  statCard: {
    backgroundColor: colors.white,
    borderRadius: "16px",
    padding: "clamp(25px, 3vw, 40px) clamp(15px, 2vw, 30px)",
    textAlign: "center",
    boxShadow: "0 8px 30px rgba(16, 185, 129, 0.1)",
    border: `1px solid rgba(16, 185, 129, 0.1)`,
    transition: "all 0.3s ease",
    width: "100%",
    boxSizing: "border-box",
  },

  statIcon: {
    width: "clamp(50px, 7vw, 80px)",
    height: "clamp(50px, 7vw, 80px)",
    backgroundColor: `${colors.primary}15`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto clamp(16px, 2vw, 24px)",
  },

  statNumber: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 800,
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
    marginBottom: "8px",
  },

  statLabel: {
    fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)",
    color: colors.grayText,
    fontWeight: 500,
    lineHeight: 1.4,
  },

  // Blood Status Section
  bloodStatusSection: {
    padding: "clamp(50px, 8vw, 100px) clamp(15px, 4vw, 40px)",
    backgroundColor: colors.white,
    width: "100%",
    boxSizing: "border-box",
  },

  sectionTitle: {
    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: "clamp(12px, 2vw, 20px)",
    color: colors.darkText,
    padding: "0 20px",
  },

  sectionSubtitle: {
    fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
    textAlign: "center",
    color: colors.grayText,
    maxWidth: "700px",
    margin: "0 auto clamp(30px, 5vw, 60px)",
    lineHeight: 1.6,
    padding: "0 20px",
  },

  bloodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    maxWidth: "800px",
    margin: "0 auto clamp(30px, 5vw, 60px)",
    padding: "0 15px",
    width: "100%",
    boxSizing: "border-box",
  },

  bloodCard: {
    backgroundColor: colors.lightBg,
    borderRadius: "16px",
    padding: "clamp(20px, 2.5vw, 32px) clamp(12px, 1.5vw, 24px)",
    textAlign: "center",
    border: `2px solid ${colors.primary}30`,
    transition: "all 0.3s ease",
    width: "100%",
    boxSizing: "border-box",
  },

  bloodType: {
    fontSize: "clamp(1.8rem, 4vw, 3rem)",
    fontWeight: 800,
    color: colors.darkText,
    marginBottom: "10px",
  },

  bloodStatus: {
    fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
    fontWeight: 600,
    padding: "6px 12px",
    borderRadius: "20px",
    display: "inline-block",
    backgroundColor: `${colors.primary}20`,
    color: colors.primary,
    width: "fit-content",
    margin: "0 auto",
  },

  // Final CTA Section
  finalCta: {
    padding: "clamp(50px, 8vw, 100px) clamp(15px, 4vw, 40px)",
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  ctaTitle: {
    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
    fontWeight: 800,
    marginBottom: "clamp(16px, 3vw, 24px)",
    lineHeight: 1.2,
  },

  ctaSubtitle: {
    fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
    marginBottom: "clamp(30px, 5vw, 48px)",
    opacity: 0.95,
    lineHeight: 1.6,
  },

  ctaButton: {
    backgroundColor: colors.white,
    color: colors.primary,
    padding: "clamp(14px, 2.5vw, 20px) clamp(24px, 4vw, 50px)",
    borderRadius: "50px",
    fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    border: `2px solid ${colors.white}`,
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    width: "min(320px, 90%)",
    maxWidth: "400px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  // Emergency Section
  emergencySection: {
    backgroundColor: colors.dark,
    color: colors.white,
    padding: "clamp(30px, 5vw, 60px) clamp(15px, 4vw, 40px)",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
  },

  emergencyContent: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  emergencyTitle: {
    fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
    marginBottom: "clamp(12px, 2vw, 20px)",
    opacity: 0.9,
  },

  emergencyNumber: {
    fontSize: "clamp(1.3rem, 3vw, 2.5rem)",
    fontWeight: 700,
    color: colors.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

// Responsive Styles Generator
const getResponsiveStyles = (width) => {
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isSmallMobile = width < 480;
  const isVerySmallMobile = width < 375;

  return {
    ...baseStyles,
    heroSection: {
      ...baseStyles.heroSection,
      minHeight: isVerySmallMobile ? "auto" : "100vh",
      padding: isVerySmallMobile ? "60px 15px" : baseStyles.heroSection.padding,
    },
    ctaContainer: {
      ...baseStyles.ctaContainer,
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "center",
      gap: isMobile ? "16px" : "24px",
    },
    button: {
      ...baseStyles.button,
      width: isMobile ? "min(320px, 100%)" : "auto",
      maxWidth: isMobile ? "320px" : baseStyles.button.maxWidth,
      padding: isSmallMobile ? "14px 20px" : baseStyles.button.padding,
    },
    statsGrid: {
      ...baseStyles.statsGrid,
      gridTemplateColumns: isSmallMobile
        ? "1fr"
        : isMobile
        ? "repeat(2, 1fr)"
        : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(4, 1fr)",
      gap: isSmallMobile ? "16px" : isMobile ? "20px" : "24px",
    },
    statCard: {
      ...baseStyles.statCard,
      padding: isSmallMobile ? "20px 15px" : baseStyles.statCard.padding,
    },
    bloodGrid: {
      ...baseStyles.bloodGrid,
      gridTemplateColumns: isSmallMobile
        ? "1fr"
        : isMobile
        ? "repeat(2, 1fr)"
        : "repeat(4, 1fr)",
      gap: isSmallMobile ? "12px" : isMobile ? "15px" : "20px",
      maxWidth: isSmallMobile ? "300px" : baseStyles.bloodGrid.maxWidth,
    },
    bloodCard: {
      ...baseStyles.bloodCard,
      padding: isSmallMobile ? "20px 12px" : baseStyles.bloodCard.padding,
    },
    emergencyNumber: {
      ...baseStyles.emergencyNumber,
      flexDirection: isSmallMobile ? "column" : "row",
      fontSize: isVerySmallMobile
        ? "1.1rem"
        : baseStyles.emergencyNumber.fontSize,
    },
    ctaButton: {
      ...baseStyles.ctaButton,
      width: isSmallMobile ? "100%" : baseStyles.ctaButton.width,
      fontSize: isSmallMobile ? "0.95rem" : baseStyles.ctaButton.fontSize,
    },
  };
};

const Home = () => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredBlood, setHoveredBlood] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const responsiveStyles = getResponsiveStyles(windowWidth);

  const statsData = [
    {
      number: "24/7",
      label: "Emergency Support",
      icon: <DropletIcon size={32} color={colors.primary} />,
    },
    {
      number: "15K+",
      label: "Verified Donors",
      icon: <UsersIcon size={32} color={colors.primary} />,
    },
    {
      number: "98%",
      label: "Response Rate",
      icon: <HeartIcon size={32} color={colors.primary} />,
    },
    {
      number: "500+",
      label: "Partner Hospitals",
      icon: <ShieldIcon size={32} color={colors.primary} />,
    },
  ];

  const bloodStatusData = [
    { type: "O-", status: "CRITICAL", color: colors.primary },
    { type: "B-", status: "LOW", color: colors.accent },
    { type: "A+", status: "MODERATE", color: colors.secondary },
    { type: "AB+", status: "ADEQUATE", color: colors.grayText },
  ];

  return (
    <div style={responsiveStyles.container}>
      {/* Hero Section */}
      <section style={responsiveStyles.heroSection}>
        <div style={responsiveStyles.heroContent}>
          <h1 style={responsiveStyles.heroTitle}>
            Every Drop Counts,
            <br />
            Every Life Matters
          </h1>
          <p style={responsiveStyles.heroSubtitle}>
            Join our network of compassionate donors. Your single donation can
            save up to 3 lives. Register today and become someone's miracle.
          </p>

          <div style={responsiveStyles.ctaContainer}>
            <Link
              to="/register"
              style={{
                ...responsiveStyles.button,
                ...responsiveStyles.primaryButton,
                backgroundColor:
                  hoveredButton === "register" ? colors.primary : colors.dark,
                transform:
                  hoveredButton === "register" ? "translateY(-3px)" : "none",
                boxSizing: "border-box",
              }}
              onMouseEnter={() => setHoveredButton("register")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <DropletIcon size={20} color={colors.white} />
              Register to Donate
              <ArrowRightIcon size={20} color={colors.white} />
            </Link>

            <Link
              to="/search"
              style={{
                ...responsiveStyles.button,
                ...responsiveStyles.secondaryButton,
                backgroundColor:
                  hoveredButton === "search" ? colors.primary : colors.white,
                color: hoveredButton === "search" ? colors.white : colors.dark,
                transform:
                  hoveredButton === "search" ? "translateY(-3px)" : "none",
                boxSizing: "border-box",
              }}
              onMouseEnter={() => setHoveredButton("search")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <UsersIcon
                size={20}
                color={
                  hoveredButton === "search" ? colors.white : colors.primary
                }
              />
              Find Donors
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={responsiveStyles.statsSection}>
        <div style={responsiveStyles.statsContainer}>
          <div style={responsiveStyles.statsGrid}>
            {statsData.map((stat, index) => (
              <div
                key={index}
                style={{
                  ...responsiveStyles.statCard,
                  transform:
                    hoveredStat === index ? "translateY(-10px)" : "none",
                  boxShadow:
                    hoveredStat === index
                      ? "0 20px 40px rgba(16, 185, 129, 0.2)"
                      : "0 8px 30px rgba(16, 185, 129, 0.1)",
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div style={responsiveStyles.statIcon}>{stat.icon}</div>
                <div style={responsiveStyles.statNumber}>{stat.number}</div>
                <div style={responsiveStyles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Status Section */}
      <section style={responsiveStyles.bloodStatusSection}>
        <h2 style={responsiveStyles.sectionTitle}>Current Blood Supply</h2>
        <p style={responsiveStyles.sectionSubtitle}>
          Real-time availability across partner hospitals. Your donation can
          make all the difference.
        </p>

        <div style={responsiveStyles.bloodGrid}>
          {bloodStatusData.map((blood, index) => (
            <div
              key={index}
              style={{
                ...responsiveStyles.bloodCard,
                transform: hoveredBlood === index ? "translateY(-5px)" : "none",
                borderColor:
                  hoveredBlood === index ? blood.color : `${blood.color}30`,
              }}
              onMouseEnter={() => setHoveredBlood(index)}
              onMouseLeave={() => setHoveredBlood(null)}
            >
              <div style={responsiveStyles.bloodType}>{blood.type}</div>
              <div
                style={{
                  ...responsiveStyles.bloodStatus,
                  backgroundColor:
                    hoveredBlood === index ? blood.color : `${blood.color}20`,
                  color: hoveredBlood === index ? colors.white : blood.color,
                }}
              >
                {blood.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={responsiveStyles.finalCta}>
        <div style={responsiveStyles.ctaContent}>
          <h2 style={responsiveStyles.ctaTitle}>Ready to Save Lives?</h2>
          <p style={responsiveStyles.ctaSubtitle}>
            Join thousands of donors who are making a difference every day.
            Register now and start your journey as a life-saver.
          </p>
          <Link
            to="/register"
            style={{
              ...responsiveStyles.ctaButton,
              backgroundColor:
                hoveredButton === "final" ? colors.secondary : colors.white,
              color: hoveredButton === "final" ? colors.white : colors.primary,
              transform:
                hoveredButton === "final" ? "translateY(-3px)" : "none",
            }}
            onMouseEnter={() => setHoveredButton("final")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <DropletIcon
              size={24}
              color={hoveredButton === "final" ? colors.white : colors.primary}
            />
            Start Saving Lives
            <ArrowRightIcon
              size={24}
              color={hoveredButton === "final" ? colors.white : colors.primary}
            />
          </Link>
        </div>
      </section>

      {/* Emergency Contact */}
      <section style={responsiveStyles.emergencySection}>
        <div style={responsiveStyles.emergencyContent}>
          <div style={responsiveStyles.emergencyTitle}>
            Emergency Blood Request
          </div>
          <div style={responsiveStyles.emergencyNumber}>
            <DropletIcon size={32} color={colors.primary} />
            24/7 Helpline: 104
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
