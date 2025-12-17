import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllDonorsAdmin,
  deleteDonorAdmin,
  toggleVerifyDonorAdmin,
} from "../services/donorService";

// Import icons
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTrash,
  FaUserCheck,
  FaUserTimes,
  FaDownload,
  FaSync,
  FaTimes,
} from "react-icons/fa";

// Enhanced Search Input Component with proper responsive behavior
const SearchInput = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`search-container ${
        isFocused ? "search-container--focused" : ""
      }`}
    >
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="search-field"
          aria-label="Search donors"
        />
        {value && (
          <button
            className="search-clear"
            onClick={() => onChange("")}
            aria-label="Clear search"
            type="button"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced Status Badge
const StatusBadge = ({ status }) => {
  const statusConfig = {
    verified: {
      label: "Verified",
      icon: <FaCheckCircle />,
      className: "status-badge--verified",
    },
    pending: {
      label: "Pending Review",
      icon: <FaClock />,
      className: "status-badge--pending",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={`status-badge ${config.className}`}>
      <span className="status-icon">{config.icon}</span>
      <span className="status-label">{config.label}</span>
    </div>
  );
};

// Enhanced Action Button
const ActionButton = ({
  children,
  variant = "primary",
  icon,
  onClick,
  disabled = false,
  size = "medium",
  fullWidth = false,
}) => {
  return (
    <button
      className={`action-btn action-btn--${variant} action-btn--${size} ${
        fullWidth ? "action-btn--full" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
    </button>
  );
};

// Enhanced Stat Card
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-content">
        <div className="stat-icon">{icon}</div>
        <div className="stat-text">
          <div className="stat-value">{value}</div>
          <div className="stat-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Donor Card
const DonorCard = ({ donor, onVerify, onDelete }) => {
  return (
    <div className="donor-card">
      <div className="card-header">
        <div className="donor-avatar">
          <div className="avatar-circle">
            {donor.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="donor-info">
          <h3 className="donor-name">{donor.name}</h3>
          <div className="donor-contact">
            <div className="contact-row">
              <FaEnvelope className="contact-icon" />
              <span className="contact-text">{donor.email}</span>
            </div>
            {donor.phone && (
              <div className="contact-row">
                <FaPhone className="contact-icon" />
                <span className="contact-text">{donor.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Blood Group</span>
            <div className="blood-badge">{donor.bloodGroup}</div>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location</span>
            <div className="location-detail">
              <FaMapMarkerAlt className="location-icon" />
              <span className="location-text">{donor.city}</span>
            </div>
          </div>
          <div className="detail-item detail-item--status">
            <span className="detail-label">Status</span>
            <StatusBadge status={donor.isVerified ? "verified" : "pending"} />
          </div>
        </div>
      </div>

      <div className="card-actions">
        <ActionButton
          variant={donor.isVerified ? "secondary" : "success"}
          icon={donor.isVerified ? <FaUserTimes /> : <FaUserCheck />}
          onClick={() => onVerify(donor._id, donor.isVerified, donor.name)}
          size="small"
          fullWidth
        >
          {donor.isVerified ? "Revoke" : "Verify"}
        </ActionButton>
        {donor.role !== "admin" && (
          <ActionButton
            variant="danger"
            icon={<FaTrash />}
            onClick={() => onDelete(donor._id, donor.name)}
            size="small"
            fullWidth
          >
            Delete
          </ActionButton>
        )}
      </div>
    </div>
  );
};

// Enhanced Filter Chip
const FilterChip = ({ label, active, onClick, count }) => (
  <button
    className={`filter-chip ${active ? "filter-chip--active" : ""}`}
    onClick={onClick}
    type="button"
  >
    <span className="chip-label">{label}</span>
    {count !== undefined && <span className="chip-count">{count}</span>}
  </button>
);

// Enhanced Controls Section with proper responsive layout
const ControlsSection = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  stats,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="controls-section">
      <div className="controls-container">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-inner">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search donors by name, email, or location..."
            />
          </div>
        </div>

        {/* Filters and Sort Section */}
        <div className="filters-sort-section">
          {/* Filters */}
          <div className="filters-wrapper">
            <div className="filters-label">
              <FaFilter className="filter-icon" />
              <span>Filter:</span>
            </div>
            <div className="filters-container">
              <FilterChip
                label="All"
                active={filter === "all"}
                onClick={() => setFilter("all")}
                count={stats.total}
              />
              <FilterChip
                label="Verified"
                active={filter === "verified"}
                onClick={() => setFilter("verified")}
                count={stats.verified}
              />
              <FilterChip
                label="Pending"
                active={filter === "pending"}
                onClick={() => setFilter("pending")}
                count={stats.pending}
              />
            </div>
          </div>

          {/* Sort - Separate row on mobile, inline on desktop */}
          <div className="sort-wrapper">
            <div className="sort-label">
              <FaSort className="sort-icon" />
              <span>Sort:</span>
            </div>
            <div className="sort-container">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort by"
              >
                <option value="name">By Name</option>
                <option value="bloodGroup">By Blood Group</option>
                <option value="city">By City</option>
                <option value="createdAt">By Date</option>
              </select>
              <button
                className="sort-order-btn"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                aria-label={`Sort ${
                  sortOrder === "asc" ? "descending" : "ascending"
                }`}
                type="button"
              >
                {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchData();
    }
  }, [token, user]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllDonorsAdmin(token);
      setDonors(data);
    } catch (err) {
      console.error("Admin Fetch Error:", err);
      setError(err.message || "Failed to fetch donors list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}'s account? This action cannot be undone.`
      )
    ) {
      try {
        await deleteDonorAdmin(id, token);
        setDonors((prev) => prev.filter((d) => d._id !== id));
      } catch (err) {
        alert(`Deletion failed: ${err.message || "Please try again."}`);
      }
    }
  };

  const handleToggleVerify = async (id, currentStatus, name) => {
    const action = currentStatus ? "revoke verification from" : "verify";
    if (window.confirm(`Are you sure you want to ${action} ${name}?`)) {
      try {
        await toggleVerifyDonorAdmin(id, !currentStatus, token);
        setDonors((prev) =>
          prev.map((d) =>
            d._id === id ? { ...d, isVerified: !currentStatus } : d
          )
        );
      } catch (err) {
        alert(`Update failed: ${err.message || "Please try again."}`);
      }
    }
  };

  const filteredDonors = useMemo(() => {
    let result = donors.filter((donor) => {
      if (filter === "verified") return donor.isVerified;
      if (filter === "pending") return !donor.isVerified;
      return true;
    });

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (donor) =>
          donor.name.toLowerCase().includes(term) ||
          donor.email.toLowerCase().includes(term) ||
          donor.city.toLowerCase().includes(term)
      );
    }

    return [...result].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "name" || sortBy === "city") {
        aValue = (aValue || "").toLowerCase();
        bValue = (bValue || "").toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [donors, filter, searchTerm, sortBy, sortOrder]);

  const stats = useMemo(
    () => ({
      total: donors.length,
      verified: donors.filter((d) => d.isVerified).length,
      pending: donors.filter((d) => !d.isVerified).length,
      uniqueCities: new Set(donors.map((d) => d.city)).size,
    }),
    [donors]
  );

  if (user?.role !== "admin") {
    return (
      <div className="access-denied-container">
        <div className="access-denied">
          <div className="denied-icon">🚫</div>
          <h1 className="denied-title">Access Denied</h1>
          <p className="denied-message">
            Administrator privileges required to access this dashboard.
          </p>
          <ActionButton
            variant="primary"
            onClick={() => (window.location.href = "/")}
            fullWidth
          >
            Return to Home
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-main">
            <div className="header-title-section">
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">Donor Management System</p>
            </div>
            <div className="header-actions-section">
              <ActionButton
                variant="secondary"
                icon={<FaSync />}
                onClick={fetchData}
                disabled={loading}
                fullWidth={isMobile}
              >
                {isMobile ? "Refresh" : "Refresh Data"}
              </ActionButton>
              <ActionButton
                variant="primary"
                icon={<FaDownload />}
                onClick={() => console.log("Export data")}
                fullWidth={isMobile}
              >
                {isMobile ? "Export" : "Export Data"}
              </ActionButton>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="stats-grid">
            <StatCard
              title="Total Donors"
              value={stats.total}
              icon={<FaUser />}
              color="blue"
            />
            <StatCard
              title="Verified"
              value={stats.verified}
              icon={<FaCheckCircle />}
              color="green"
            />
            <StatCard
              title="Pending Review"
              value={stats.pending}
              icon={<FaClock />}
              color="yellow"
            />
            <StatCard
              title="Cities"
              value={stats.uniqueCities}
              icon={<FaMapMarkerAlt />}
              color="purple"
            />
          </div>
        </header>

        {/* Controls Section */}
        <ControlsSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          stats={stats}
        />

        {/* Main Content */}
        <main className="dashboard-main">
          {error && (
            <div className="error-container">
              <div className="error-alert">
                <strong>Error:</strong> {error}
                <button className="retry-btn" onClick={fetchData} type="button">
                  Retry
                </button>
              </div>
            </div>
          )}

          <div className="content-header-section">
            <div className="content-title-wrapper">
              <h2 className="content-title">Donor Management</h2>
              <span className="donor-count">({filteredDonors.length})</span>
            </div>
            <p className="content-description">
              {searchTerm
                ? `Search results for "${searchTerm}"`
                : "All registered donors"}
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading donor data...</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            <div className="empty-container">
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3 className="empty-title">No donors found</h3>
                <p className="empty-message">
                  {searchTerm
                    ? "No donors match your search criteria. Try a different search term."
                    : filter !== "all"
                    ? "No donors match the selected filter."
                    : "No donor accounts have been registered yet."}
                </p>
                {(searchTerm || filter !== "all") && (
                  <ActionButton
                    variant="secondary"
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("all");
                    }}
                    fullWidth={isMobile}
                  >
                    Clear Filters
                  </ActionButton>
                )}
              </div>
            </div>
          ) : (
            <div className="donors-container">
              <div className="donors-grid">
                {filteredDonors.map((donor) => (
                  <DonorCard
                    key={donor._id}
                    donor={donor}
                    onVerify={handleToggleVerify}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-content">
            <p className="copyright-text">
              © {new Date().getFullYear()} BloodConnect Network. Admin Dashboard
              v1.0
            </p>
            <p className="update-text">
              Last updated:{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        /* CSS Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Admin Dashboard Container */
        .admin-dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          padding: 0;
          margin: 0;
        }

        .dashboard-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(16px, 3vw, 24px);
        }

        /* Header Styles */
        .dashboard-header {
          background: white;
          border-radius: 16px;
          padding: clamp(20px, 4vw, 32px);
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          width: 100%;
        }

        .header-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          margin-bottom: 32px;
        }

        @media (min-width: 768px) {
          .header-main {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .header-title-section {
          flex: 1;
          min-width: 0;
        }

        .dashboard-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          word-break: break-word;
        }

        .dashboard-subtitle {
          color: #64748b;
          font-size: clamp(0.875rem, 2vw, 1rem);
          margin: 0;
        }

        .header-actions-section {
          display: flex;
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        @media (min-width: 768px) {
          .header-actions-section {
            width: auto;
            flex-shrink: 0;
          }
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 240px), 1fr)
          );
          gap: 16px;
          width: 100%;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease;
          width: 100%;
          min-width: 0;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
        }

        .stat-card--blue {
          border-left: 4px solid #3b82f6;
        }

        .stat-card--green {
          border-left: 4px solid #10b981;
        }

        .stat-card--yellow {
          border-left: 4px solid #f59e0b;
        }

        .stat-card--purple {
          border-left: 4px solid #8b5cf6;
        }

        .stat-content {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          min-width: 0;
        }

        .stat-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .stat-card--blue .stat-icon {
          color: #3b82f6;
        }

        .stat-card--green .stat-icon {
          color: #10b981;
        }

        .stat-card--yellow .stat-icon {
          color: #f59e0b;
        }

        .stat-card--purple .stat-icon {
          color: #8b5cf6;
        }

        .stat-text {
          flex: 1;
          min-width: 0;
        }

        .stat-value {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
          line-height: 1;
        }

        .stat-title {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Controls Section - FIXED RESPONSIVENESS */
        .controls-section {
          background: white;
          border-radius: 16px;
          padding: clamp(20px, 4vw, 32px);
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          width: 100%;
        }

        .controls-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Search Section */
        .search-section {
          width: 100%;
          min-width: 0;
        }

        .search-inner {
          width: 100%;
          min-width: 0;
        }

        .search-container {
          width: 100%;
          min-width: 0;
        }

        .search-wrapper {
          position: relative;
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: clamp(12px, 3vw, 16px);
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 1rem;
          z-index: 1;
          flex-shrink: 0;
        }

        .search-field {
          width: 100%;
          min-width: 0;
          padding: clamp(12px, 3vw, 16px) clamp(12px, 3vw, 16px)
            clamp(12px, 3vw, 16px) clamp(40px, 6vw, 48px);
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: clamp(0.875rem, 2vw, 1rem);
          background: #f8fafc;
          color: #1e293b;
          transition: all 0.2s ease;
          flex: 1;
          min-width: 0;
          -webkit-appearance: none;
          appearance: none;
        }

        .search-field:focus {
          outline: none;
          border-color: #ef4444;
          background: white;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .search-clear {
          position: absolute;
          right: clamp(12px, 3vw, 16px);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          z-index: 1;
        }

        .search-clear:hover {
          color: #64748b;
        }

        /* Filters and Sort Section */
        .filters-sort-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        @media (min-width: 768px) {
          .filters-sort-section {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .filters-wrapper,
        .sort-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
          width: 100%;
        }

        @media (min-width: 768px) {
          .filters-wrapper,
          .sort-wrapper {
            flex-direction: row;
            align-items: center;
            width: auto;
          }
        }

        .filters-label,
        .sort-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          font-weight: 600;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .filters-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          min-width: 0;
          flex: 1;
        }

        .sort-container {
          display: flex;
          gap: 8px;
          min-width: 0;
          flex: 1;
        }

        @media (min-width: 768px) {
          .sort-container {
            flex: 0 1 auto;
          }
        }

        .filter-chip {
          padding: 8px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          background: #f8fafc;
          color: #475569;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          min-width: 0;
          white-space: nowrap;
        }

        .filter-chip:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }

        .filter-chip--active {
          background: #ef4444;
          border-color: #ef4444;
          color: white;
        }

        .chip-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chip-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .sort-select {
          flex: 1;
          min-width: 0;
          padding: 8px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: #475569;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          font-weight: 500;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
        }

        .sort-order-btn {
          padding: 8px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 40px;
        }

        /* Main Content */
        .dashboard-main {
          background: white;
          border-radius: 16px;
          padding: clamp(20px, 4vw, 32px);
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          width: 100%;
        }

        .content-header-section {
          margin-bottom: 32px;
          width: 100%;
        }

        .content-title-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
          width: 100%;
        }

        .content-title {
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          word-break: break-word;
        }

        .donor-count {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          flex-shrink: 0;
        }

        .content-description {
          color: #64748b;
          margin: 0;
          font-size: clamp(0.875rem, 2vw, 1rem);
        }

        /* Donor Cards Grid */
        .donors-container {
          width: 100%;
          min-width: 0;
        }

        .donors-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 100%;
          min-width: 0;
        }

        @media (min-width: 640px) {
          .donors-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .donors-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1400px) {
          .donors-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Donor Card */
        .donor-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
        }

        .card-header {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        @media (min-width: 480px) {
          .card-header {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        .donor-avatar {
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
        }

        .donor-info {
          flex: 1;
          min-width: 0;
        }

        .donor-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 12px 0;
          word-break: break-word;
        }

        .donor-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.875rem;
          min-width: 0;
        }

        .contact-icon {
          color: #94a3b8;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .contact-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        .card-details {
          padding: 20px;
          flex: 1;
          min-width: 0;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 480px) {
          .detail-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .detail-item--status {
            grid-column: span 2;
          }
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .detail-label {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .blood-badge {
          background: #fee2e2;
          color: #dc2626;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          text-align: center;
          min-width: 0;
        }

        .location-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          font-weight: 500;
          min-width: 0;
        }

        .location-icon {
          color: #ef4444;
          flex-shrink: 0;
        }

        .location-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: fit-content;
          min-width: 0;
        }

        .status-badge--verified {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .status-badge--pending {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }

        .status-icon {
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .status-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        .card-actions {
          padding: 20px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 12px;
          min-width: 0;
        }

        @media (max-width: 479px) {
          .card-actions {
            flex-direction: column;
          }
        }

        /* Action Button */
        .action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
          min-width: 0;
          text-align: center;
        }

        .action-btn--full {
          width: 100%;
        }

        .action-btn--small {
          padding: 8px 16px;
          font-size: 0.75rem;
        }

        .action-btn--primary {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .action-btn--secondary {
          background: white;
          color: #4b5563;
          border: 1px solid #d1d5db;
        }

        .action-btn--success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .action-btn--danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .action-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-icon {
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .btn-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          width: 100%;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid #e2e8f0;
          border-top-color: #ef4444;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Empty State */
        .empty-container {
          width: 100%;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          width: 100%;
        }

        .empty-icon {
          font-size: 3rem;
          color: #cbd5e1;
          margin-bottom: 20px;
        }

        .empty-title {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 0 0 12px 0;
        }

        .empty-message {
          color: #64748b;
          max-width: 400px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        /* Error Alert */
        .error-container {
          width: 100%;
          margin-bottom: 24px;
        }

        .error-alert {
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .retry-btn {
          color: #ef4444;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Footer */
        .dashboard-footer {
          text-align: center;
          padding: 24px;
          color: #64748b;
          font-size: 0.875rem;
          width: 100%;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .copyright-text,
        .update-text {
          margin: 0;
          word-break: break-word;
        }

        /* Access Denied */
        .access-denied-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }

        .access-denied {
          background: white;
          border-radius: 16px;
          padding: 48px;
          text-align: center;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .denied-icon {
          font-size: 3rem;
          margin-bottom: 24px;
        }

        .denied-title {
          font-size: 1.5rem;
          color: #dc2626;
          margin: 0 0 16px 0;
        }

        .denied-message {
          color: #666;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 639px) {
          .dashboard-container {
            padding: 12px;
          }

          .dashboard-header,
          .controls-section,
          .dashboard-main {
            padding: 16px;
          }

          .header-actions-section {
            flex-direction: column;
          }

          .filters-container {
            justify-content: center;
          }

          .filter-chip {
            flex: 1;
            min-width: 80px;
            justify-content: center;
          }

          .sort-select {
            flex: 1;
          }

          .donors-grid {
            grid-template-columns: 1fr;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tablet-specific optimizations */
        @media (min-width: 640px) and (max-width: 1023px) {
          .donors-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .detail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Prevent horizontal overflow */
        body {
          overflow-x: hidden;
        }

        /* Ensure all elements respect container width */
        .dashboard-container > * {
          max-width: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
