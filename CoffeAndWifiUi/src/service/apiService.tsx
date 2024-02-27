/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestOptions, CafeListResponse } from "./apiInterfaces";
const baseUrl = "http://localhost:5153";

export const fetchCafeList = async ({ path, method, body }: RequestOptions) => {
  try {
    const url = `${baseUrl}${path}`;
    const options: RequestInit = {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
