// src/services/donorService.js (FULL CODE - Added Search & Admin Functions)

import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://blood-connect-tuev-pcf5x8lwg-ranjitshahkanu024s-projects.vercel.app/api/donors";

// Helper to create headers
const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// --- PUBLIC SERVICES ---

export const registerDonor = async (donorData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, donorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginDonor = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const searchDonors = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// --- PRIVATE USER SERVICES ---

export const getDonorProfile = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/profile`,
      createAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateDonorProfile = async (donorId, profileData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/profile`,
      profileData,
      createAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateDonorAvailability = async (donorId, isAvailable, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/availability`,
      { isAvailable },
      createAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// --- ADMIN SERVICES ---

/**
 * Admin: Fetch all registered donors
 */
export const getAllDonorsAdmin = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/all`,
      createAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Admin: Delete a specific donor by ID
 */
export const deleteDonorAdmin = async (id, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/${id}`,
      createAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Admin: Toggle verification status for a donor
 */
export const toggleVerifyDonorAdmin = async (id, isVerified, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/verify/${id}`,
      { isVerified },
      createAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
