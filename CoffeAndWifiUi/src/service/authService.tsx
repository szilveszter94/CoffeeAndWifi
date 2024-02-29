/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { fetchData } from "./apiService";

// Function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

interface tokenValidateProps {
  token: string;
}

export const logoutUser = async () => {
  try {
    const response = await fetchData({
      path: "/Auth/Logout",
      method: "GET",
      body: null,
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Function to validate the token
const validateAuthToken = async ({
  token,
}: tokenValidateProps): Promise<boolean> => {
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
    console.error("Error validating token:", error);
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
