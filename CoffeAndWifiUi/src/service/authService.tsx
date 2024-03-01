/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "./apiService";

export const logoutUser = async () => {
  try {
    localStorage.removeItem("accessToken");
    console.log("Logout successful.");
  } catch (error) {
    console.log("Failed to logout.");
    return false;
  }
};

// Function to check authentication status
export const getAuth = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const userAuth = await fetchData({
      path: "/Auth/Validate",
      method: "POST",
      body: { token },
    });

    if (userAuth.ok) {
      return userAuth;
    }
    return false;
  } catch (error) {
    console.error("Error validating token.");
    return false;
  }
};
