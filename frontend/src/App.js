import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components and Pages
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import DonorProfile from "./pages/DonorProfile";
import Login from "./pages/Login";
import SearchDonors from "./pages/SearchDonors";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard"; // Added Import

const App = () => {
  return (
    <Router>
      <Header />
      {/* Main Content Area */}
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchDonors />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/profile"
            element={<PrivateRoute element={DonorProfile} />}
          />

          {/* NEW ADMIN PROTECTED ROUTE */}
          <Route
            path="/admin"
            element={<PrivateRoute element={AdminDashboard} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
