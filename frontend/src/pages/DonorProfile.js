// src/pages/DonorProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiDroplet,
  FiMapPin,
  FiPhone,
  FiSave,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiHeart,
  FiShield,
  FiClock,
  FiGlobe,
  FiCalendar,
  FiEdit2,
} from "react-icons/fi";

// Blood group options for dropdown
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// --- Modern Professional Styles with Emotional Theme ---
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgba(139, 0, 0, 0.92) 0%, rgba(178, 34, 34, 0.88) 100%)",
    position: "relative",
    padding: "20px",
    fontFamily:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    opacity: 0.15,
    zIndex: 1,
  },
  container: {
    maxWidth: "1200px",
    margin: "30px auto",
    position: "relative",
    zIndex: 2,
  },
  headerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "30px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  heroContent: {
    flex: 1,
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #cf1322 0%, #ff6b6b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#5a5a5a",
    fontWeight: "400",
    lineHeight: "1.6",
    maxWidth: "700px",
  },
  heroStats: {
    display: "flex",
    gap: "30px",
    marginTop: "30px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  statIcon: {
    backgroundColor: "#fff0f0",
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cf1322",
    fontSize: "22px",
  },
  statText: {
    display: "flex",
    flexDirection: "column",
  },
  statValue: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#666",
    fontWeight: "500",
  },
  statusBadge: {
    backgroundColor: "#fff0f0",
    borderRadius: "20px",
    padding: "30px",
    minWidth: "180px",
    textAlign: "center",
    border: "2px solid #ffcccc",
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "25px",
    marginBottom: "30px",
  },
  profileCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  },
  profileCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 40px rgba(207, 19, 34, 0.2)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
    paddingBottom: "15px",
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  cardIcon: {
    backgroundColor: "#fff0f0",
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cf1322",
    fontSize: "22px",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: 0,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  },
  infoLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.95rem",
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  bloodGroupBadge: {
    backgroundColor: "#fff0f0",
    color: "#cf1322",
    padding: "8px 20px",
    borderRadius: "50px",
    fontWeight: "700",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "2px solid #ffcccc",
    minWidth: "80px",
    justifyContent: "center",
  },
  updateCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    borderTop: "4px solid #cf1322",
    marginTop: "30px",
  },
  updateHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  updateIcon: {
    backgroundColor: "#fff0f0",
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cf1322",
    fontSize: "24px",
  },
  updateTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: 0,
  },
  updateSubtitle: {
    fontSize: "1rem",
    color: "#666",
    marginTop: "5px",
  },
  inputGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginBottom: "35px",
  },
  inputGroup: {
    position: "relative",
  },
  inputLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.95rem",
    color: "#555",
    fontWeight: "600",
    marginBottom: "12px",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "16px 20px 16px 50px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "#cf1322",
    boxShadow: "0 0 0 4px rgba(207, 19, 34, 0.1)",
    backgroundColor: "white",
  },
  selectInput: {
    width: "100%",
    padding: "16px 20px 16px 50px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxSizing: "border-box",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 20px center",
    backgroundSize: "16px",
  },
  inputIcon: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999",
    fontSize: "18px",
    pointerEvents: "none",
  },
  currentValue: {
    fontSize: "0.85rem",
    color: "#888",
    marginTop: "8px",
    paddingLeft: "50px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  saveButton: {
    padding: "16px 40px",
    background: "linear-gradient(135deg, #cf1322 0%, #ff6b6b 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 6px 20px rgba(207, 19, 34, 0.3)",
    letterSpacing: "0.5px",
    minWidth: "180px",
  },
  saveButtonHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 25px rgba(207, 19, 34, 0.4)",
  },
  saveButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none !important",
    boxShadow: "0 6px 20px rgba(207, 19, 34, 0.2) !important",
  },
  resetButton: {
    padding: "16px 30px",
    backgroundColor: "transparent",
    color: "#666",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    minWidth: "150px",
  },
  resetButtonHover: {
    borderColor: "#cf1322",
    color: "#cf1322",
  },
  messageContainer: {
    marginTop: "30px",
  },
  message: {
    padding: "18px 25px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "1rem",
    fontWeight: "500",
    animation: "slideIn 0.3s ease-out",
  },
  successMessage: {
    backgroundColor: "rgba(56, 158, 13, 0.1)",
    color: "#389e0d",
    border: "1px solid rgba(56, 158, 13, 0.2)",
  },
  errorMessage: {
    backgroundColor: "rgba(207, 19, 34, 0.1)",
    color: "#cf1322",
    border: "1px solid rgba(207, 19, 34, 0.2)",
  },
  infoMessage: {
    backgroundColor: "rgba(24, 144, 255, 0.1)",
    color: "#1890ff",
    border: "1px solid rgba(24, 144, 255, 0.2)",
  },
  floatingElements: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 1,
    overflow: "hidden",
  },
  floatingElement: {
    position: "absolute",
    opacity: 0.1,
    fontSize: "120px",
    color: "#fff",
    animation: "float 25s infinite linear",
  },
  sectionDivider: {
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    margin: "40px 0",
    position: "relative",
  },
  sectionDividerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "0 20px",
    color: "#666",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
};

const API_URL = "http://localhost:5000/api/donors";

const DonorProfile = () => {
  const { user, token, isAuthenticated, updateProfile } = useAuth();
  const [updates, setUpdates] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [stats, setStats] = useState({
    donations: 8,
    livesSaved: 29,
    lastDonation: "3 weeks ago",
  });

  // Dynamic stats calculation
  useEffect(() => {
    if (user) {
      // You can replace this with actual API call for user stats
      const calculatedStats = {
        donations: Math.floor(Math.random() * 10) + 5,
        livesSaved: Math.floor(Math.random() * 30) + 15,
        lastDonation: [
          "1 month ago",
          "2 months ago",
          "3 weeks ago",
          "Just now",
        ][Math.floor(Math.random() * 4)],
      };
      setStats(calculatedStats);
    }
  }, [user]);

  const handleChange = (e) => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setUpdates({});
    setMessage("");
  };

  const handleUpdate = async () => {
    if (Object.keys(updates).length === 0) {
      setMessage("Please make changes before saving.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await axios.put(`${API_URL}/profile`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });

      updateProfile(res.data);
      setUpdates({});
      setMessage(
        "✓ Profile updated successfully! Your information is now synchronized."
      );

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      setMessage(
        "✗ " +
          (err.response?.data?.message ||
            "Error updating profile. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.backgroundOverlay}></div>
        <div
          style={{
            ...styles.container,
            textAlign: "center",
            padding: "100px 20px",
          }}
        >
          <div style={styles.headerCard}>
            <FiAlertCircle
              style={{
                fontSize: "60px",
                color: "#ff4d4f",
                marginBottom: "20px",
              }}
            />
            <h2 style={{ color: "#1a1a1a", marginBottom: "15px" }}>
              Profile Access Required
            </h2>
            <p
              style={{
                color: "#666",
                maxWidth: "500px",
                margin: "0 auto 30px",
              }}
            >
              Please log in to access your donor profile and help save lives.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasChanges = Object.keys(updates).length > 0;

  return (
    <div style={styles.pageWrapper}>
      {/* Background Overlay */}
      <div style={styles.backgroundOverlay}></div>

      {/* Floating Elements for Emotional Impact */}
      <div style={styles.floatingElements}>
        <FiHeart
          style={{
            ...styles.floatingElement,
            top: "10%",
            left: "5%",
            animationDelay: "0s",
          }}
        />
        <FiDroplet
          style={{
            ...styles.floatingElement,
            top: "20%",
            right: "10%",
            animationDelay: "8s",
          }}
        />
        <FiHeart
          style={{
            ...styles.floatingElement,
            bottom: "30%",
            left: "15%",
            animationDelay: "16s",
          }}
        />
        <FiDroplet
          style={{
            ...styles.floatingElement,
            bottom: "15%",
            right: "20%",
            animationDelay: "24s",
          }}
        />
      </div>

      <div style={styles.container}>
        {/* Hero Header */}
        <div style={styles.headerCard}>
          <div style={styles.heroSection}>
            <div style={styles.heroContent}>
              <h1 style={styles.title}>Donor Profile</h1>
              <p style={styles.subtitle}>
                Every drop counts. Your profile helps connect donors with
                recipients in need, creating life-saving opportunities across
                the nation.
              </p>

              <div style={styles.heroStats}>
                <div style={styles.statItem}>
                  <div style={styles.statIcon}>
                    <FiDroplet />
                  </div>
                  <div style={styles.statText}>
                    <span style={styles.statValue}>{stats.donations}</span>
                    <span style={styles.statLabel}>Donations</span>
                  </div>
                </div>

                <div style={styles.statItem}>
                  <div style={styles.statIcon}>
                    <FiHeart />
                  </div>
                  <div style={styles.statText}>
                    <span style={styles.statValue}>{stats.livesSaved}</span>
                    <span style={styles.statLabel}>Lives Impacted</span>
                  </div>
                </div>

                <div style={styles.statItem}>
                  <div style={styles.statIcon}>
                    <FiClock />
                  </div>
                  <div style={styles.statText}>
                    <span style={styles.statValue}>{stats.lastDonation}</span>
                    <span style={styles.statLabel}>Last Donation</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.statusBadge}>
              <FiShield
                size={40}
                color="#cf1322"
                style={{ marginBottom: "15px" }}
              />
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                Donor Status
              </div>
              <div
                style={{
                  backgroundColor: "#cf1322",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "50px",
                  fontWeight: "700",
                  fontSize: "1rem",
                }}
              >
                ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div style={styles.profileGrid}>
          {/* Personal Info Card */}
          <div
            style={{
              ...styles.profileCard,
              ...(hoveredCard === "personal" && styles.profileCardHover),
            }}
            onMouseEnter={() => setHoveredCard("personal")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <FiUser />
              </div>
              <h3 style={styles.cardTitle}>Personal Information</h3>
            </div>

            <div style={styles.infoRow}>
              <div style={styles.infoLabel}>
                <FiUser size={18} />
                Full Name
              </div>
              <div style={styles.infoValue}>{user.name}</div>
            </div>

            <div style={styles.infoRow}>
              <div style={styles.infoLabel}>
                <FiMail size={18} />
                Email Address
              </div>
              <div style={styles.infoValue}>{user.email}</div>
            </div>
          </div>

          {/* Medical Info Card */}
          <div
            style={{
              ...styles.profileCard,
              ...(hoveredCard === "medical" && styles.profileCardHover),
            }}
            onMouseEnter={() => setHoveredCard("medical")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <FiDroplet />
              </div>
              <h3 style={styles.cardTitle}>Medical Information</h3>
            </div>

            <div style={styles.infoRow}>
              <div style={styles.infoLabel}>
                <FiDroplet size={18} />
                Blood Group
              </div>
              <div style={styles.infoValue}>
                <span style={styles.bloodGroupBadge}>
                  <FiDroplet size={16} />
                  {user.bloodGroup}
                </span>
              </div>
            </div>

            <div style={{ ...styles.infoRow, borderBottom: "none" }}>
              <div style={styles.infoLabel}>
                <FiCalendar size={18} />
                Availability
              </div>
              <div
                style={{
                  ...styles.infoValue,
                  color: "#389e0d",
                  fontSize: "0.9rem",
                  backgroundColor: "rgba(56, 158, 13, 0.1)",
                  padding: "6px 15px",
                  borderRadius: "20px",
                }}
              >
                Ready to Donate
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div
            style={{
              ...styles.profileCard,
              ...(hoveredCard === "contact" && styles.profileCardHover),
            }}
            onMouseEnter={() => setHoveredCard("contact")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                <FiMapPin />
              </div>
              <h3 style={styles.cardTitle}>Contact & Location</h3>
            </div>

            <div style={styles.infoRow}>
              <div style={styles.infoLabel}>
                <FiMapPin size={18} />
                City
              </div>
              <div style={styles.infoValue}>{user.city}</div>
            </div>

            <div style={{ ...styles.infoRow, borderBottom: "none" }}>
              <div style={styles.infoLabel}>
                <FiPhone size={18} />
                Phone Number
              </div>
              <div style={styles.infoValue}>{user.phone}</div>
            </div>
          </div>
        </div>

        {/* Update Profile Section */}
        <div style={styles.updateCard}>
          <div style={styles.updateHeader}>
            <div style={styles.updateIcon}>
              <FiEdit2 />
            </div>
            <div>
              <h3 style={styles.updateTitle}>Update Your Information</h3>
              <p style={styles.updateSubtitle}>
                Keep your details current to ensure you can be reached when
                lives depend on it
              </p>
            </div>
          </div>

          <div style={styles.inputGrid}>
            {/* City Input */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>
                <FiMapPin size={18} />
                Update City
              </label>
              <div style={styles.inputWrapper}>
                <FiMapPin style={styles.inputIcon} />
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("city")}
                  onBlur={() => setFocusedInput(null)}
                  style={{
                    ...styles.input,
                    ...(focusedInput === "city" && styles.inputFocus),
                  }}
                  value={updates.city || ""}
                  maxLength="50"
                />
              </div>
              <div style={styles.currentValue}>
                <FiMapPin size={14} />
                Current: {user.city}
              </div>
            </div>

            {/* Phone Input */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>
                <FiPhone size={18} />
                Update Phone
              </label>
              <div style={styles.inputWrapper}>
                <FiPhone style={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("phone")}
                  onBlur={() => setFocusedInput(null)}
                  style={{
                    ...styles.input,
                    ...(focusedInput === "phone" && styles.inputFocus),
                  }}
                  value={updates.phone || ""}
                  maxLength="15"
                />
              </div>
              <div style={styles.currentValue}>
                <FiPhone size={14} />
                Current: {user.phone}
              </div>
            </div>

            {/* Blood Group Input - Fixed with select dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>
                <FiDroplet size={18} />
                Update Blood Group
              </label>
              <div style={styles.inputWrapper}>
                <FiDroplet style={styles.inputIcon} />
                <select
                  name="bloodGroup"
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("bloodGroup")}
                  onBlur={() => setFocusedInput(null)}
                  style={{
                    ...styles.selectInput,
                    ...(focusedInput === "bloodGroup" && styles.inputFocus),
                    paddingRight: "50px",
                  }}
                  value={updates.bloodGroup || ""}
                >
                  <option value="">Select Blood Group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.currentValue}>
                <FiDroplet size={14} />
                Current: {user.bloodGroup}
              </div>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={handleUpdate}
              style={{
                ...styles.saveButton,
                ...(hasChanges && !isSubmitting && styles.saveButtonHover),
                ...((isSubmitting || !hasChanges) && styles.saveButtonDisabled),
              }}
              disabled={isSubmitting || !hasChanges}
              onMouseEnter={(e) => {
                if (hasChanges && !isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(207, 19, 34, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (hasChanges && !isSubmitting) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(207, 19, 34, 0.3)";
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <FiRefreshCw className="spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </button>

            {hasChanges && (
              <button
                onClick={handleReset}
                style={styles.resetButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#cf1322";
                  e.currentTarget.style.color = "#cf1322";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e0e0e0";
                  e.currentTarget.style.color = "#666";
                }}
              >
                Discard Changes
              </button>
            )}
          </div>

          {/* Message Display */}
          {message && (
            <div style={styles.messageContainer}>
              <div
                style={{
                  ...styles.message,
                  ...(message.includes("✓")
                    ? styles.successMessage
                    : message.includes("✗")
                    ? styles.errorMessage
                    : styles.infoMessage),
                }}
              >
                {message.includes("✓") ? (
                  <FiCheckCircle size={24} />
                ) : message.includes("✗") ? (
                  <FiAlertCircle size={24} />
                ) : (
                  <FiAlertCircle size={24} />
                )}
                <span>{message}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(0) rotate(180deg);
          }
          75% {
            transform: translateY(20px) rotate(270deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        /* Add smooth transitions */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(207, 19, 34, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(207, 19, 34, 0.7);
        }

        select {
          cursor: pointer;
        }

        select option {
          padding: 10px;
          background: white;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default DonorProfile;
