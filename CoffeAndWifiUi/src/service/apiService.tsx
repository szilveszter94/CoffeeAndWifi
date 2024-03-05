/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestOptions, BaseResponse } from "./apiInterfaces";
const baseUrl = "https://localhost:7079";

export const fetchData = async ({ path, method, body }: RequestOptions) => {
  try {
    const url = `${baseUrl}${path}`;

    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body !== null && body !== undefined) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    
    const data = await response.json();
    
    const returnObj: BaseResponse = {
      ok: response.ok,
      message: data.message,
      data: data.data,
      status: response.status,
    };
    return returnObj;
  } catch (error) {
    return { ok: false, message: "Error: The server is not responding." };
  }
};
