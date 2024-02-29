/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestOptions, CafeListResponse } from "./apiInterfaces";
const baseUrl = "http://localhost:7079";

export const fetchData = async ({ path, method, body }: RequestOptions) => {
  try {
    const url = `${baseUrl}${path}`;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token not found");
    }

    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body !== null && body !== undefined) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    const data = await response.json();
    const returnObj: CafeListResponse = {
      ok: response.ok,
      message: data.message,
      data: data.data,
    };
    return returnObj;
  } catch (error) {
    return { ok: false, message: "Error: The server is not responding." };
  }
};
