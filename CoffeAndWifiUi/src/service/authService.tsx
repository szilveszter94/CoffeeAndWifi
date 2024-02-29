/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { fetchData } from "./apiService";

interface tokenValidateProps {
  token: string;
}

const isTokenExpired = (token: string): boolean => {
  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("accessToken");
    console.log("Logout successful.");
  } catch (error) {
    console.log("Failed to logout.");
    return false;
  }
};

const validateAuthToken = async (
  token: tokenValidateProps
): Promise<boolean> => {
  try {
    const isValid = await fetchData({
      path: "/Auth/Validate",
      method: "POST",
      body: token,
    });

    if (isValid.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error validating token.");
    return false;
  }
};

// Function to check authentication status
export const checkAuthStatus = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("accessToken");
    return false;
  }

  const isValid = await validateAuthToken({ token });
  if (!isValid) {
    localStorage.removeItem("accessToken");
    return false;
  }

  return true;
};
