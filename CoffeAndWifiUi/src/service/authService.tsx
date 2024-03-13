/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "./apiService";

interface userProps {
  email: string;
  role: string;
  userId: string;
  userName: string;
}

export interface authProps {
  data: userProps;
  message: string;
  ok: boolean;
}

export const logoutUser = async () => {
  try {
    localStorage.removeItem("accessToken");
    return true;
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
    
    return userAuth;

  } catch (error) {
    console.error("Error. Server not responding.");
    return false;
  }
};
