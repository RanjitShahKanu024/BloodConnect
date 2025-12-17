import React, { useState, useEffect } from "react";
import { searchDonors } from "../services/donorService";
import FormInput from "../components/FormInput";

const SearchDonors = () => {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    city: "",
  });
  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchParams.bloodGroup && !searchParams.city) {
      setMessage("Please enter a Blood Group or City to search.");
      setDonors([]);
      return;
    }

    setMessage("");
    setLoading(true);
    setDonors([]);

    try {
      const results = await searchDonors(searchParams);
      setDonors(results);
      setMessage(`Found ${results.length} available donor(s).`);
    } catch (err) {
      const errorMsg =
        err.message ||
        err.error ||
        "An unexpected error occurred during search.";
      if (errorMsg.includes("No available donors")) {
        setMessage(errorMsg);
      } else {
        setMessage(`Error: ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: isMobile ? "30px auto" : isTablet ? "35px auto" : "40px auto",
        padding: isMobile ? "20px" : isTablet ? "25px" : "30px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        width: isMobile ? "90%" : "100%",
        minWidth: "0",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "#d32f2f",
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: "10px",
          marginBottom: isMobile ? "20px" : "25px",
          fontSize: isMobile ? "1.5rem" : "1.75rem",
          fontWeight: 600,
          wordBreak: "break-word",
        }}
      >
        Find Available Donors 🩸
      </h2>

      <form
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "12px" : "15px",
          marginBottom: isMobile ? "25px" : "30px",
          alignItems: "stretch",
          width: "100%",
          minWidth: "0",
        }}
        onSubmit={handleSearch}
      >
        <div
          style={{
            flex: 1,
            minWidth: "0",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <FormInput
            type="text"
            name="bloodGroup"
            placeholder="Blood Group (e.g., O+)"
            value={searchParams.bloodGroup}
            onChange={handleChange}
            style={{
              width: "100%",
              minWidth: "0",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: "0",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <FormInput
            type="text"
            name="city"
            placeholder="City"
            value={searchParams.city}
            onChange={handleChange}
            style={{
              width: "100%",
              minWidth: "0",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: isMobile ? "10px 16px" : "12px 20px",
            backgroundColor: "#00796b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
            minWidth: isMobile ? "100%" : "150px",
            width: isMobile ? "100%" : "auto",
            boxSizing: "border-box",
          }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {message && (
        <p
          style={{
            textAlign: "center",
            padding: isMobile ? "15px" : "20px",
            borderRadius: "8px",
            color: donors.length > 0 ? "#388e3c" : "#ff9800",
            backgroundColor: donors.length > 0 ? "#e8f5e9" : "#fff3e0",
            margin: isMobile ? "15px 0" : "20px 0",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
            lineHeight: 1.5,
            wordBreak: "break-word",
          }}
        >
          {message}
        </p>
      )}

      {donors.length > 0 && (
        <div
          style={{
            overflowX: "auto",
            width: "100%",
            minWidth: "0",
            marginTop: isMobile ? "15px" : "20px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: isMobile ? "600px" : "0",
            }}
          >
            <thead
              style={{
                backgroundColor: "#f7f9fc",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: isMobile ? "12px 10px" : "15px",
                    textAlign: "left",
                    color: "#546e7a",
                    textTransform: "uppercase",
                    fontSize: isMobile ? "0.8em" : "0.9em",
                    borderBottom: "2px solid #e0e0e0",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Blood Group
                </th>
                <th
                  style={{
                    padding: isMobile ? "12px 10px" : "15px",
                    textAlign: "left",
                    color: "#546e7a",
                    textTransform: "uppercase",
                    fontSize: isMobile ? "0.8em" : "0.9em",
                    borderBottom: "2px solid #e0e0e0",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: isMobile ? "12px 10px" : "15px",
                    textAlign: "left",
                    color: "#546e7a",
                    textTransform: "uppercase",
                    fontSize: isMobile ? "0.8em" : "0.9em",
                    borderBottom: "2px solid #e0e0e0",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  City
                </th>
                <th
                  style={{
                    padding: isMobile ? "12px 10px" : "15px",
                    textAlign: "left",
                    color: "#546e7a",
                    textTransform: "uppercase",
                    fontSize: isMobile ? "0.8em" : "0.9em",
                    borderBottom: "2px solid #e0e0e0",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id}>
                  <td
                    style={{
                      padding: isMobile ? "12px 10px" : "15px",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#333",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#d32f2f",
                        color: "white",
                        padding: isMobile ? "3px 6px" : "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.8em" : "0.9em",
                        display: "inline-block",
                      }}
                    >
                      {donor.bloodGroup}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: isMobile ? "12px 10px" : "15px",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#333",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {donor.name}
                  </td>
                  <td
                    style={{
                      padding: isMobile ? "12px 10px" : "15px",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#333",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {donor.city}
                  </td>
                  <td
                    style={{
                      padding: isMobile ? "12px 10px" : "15px",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#333",
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {donor.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
