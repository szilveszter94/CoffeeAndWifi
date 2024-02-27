/* eslint-disable @typescript-eslint/no-explicit-any */
const baseUrl = "http://localhost:5153";

interface RequestOptions {
  path: string;
  method: string;
  body?: any;
}

export interface CommentProps {
    authorId: number;
    cafeId: number;
    date: string;
    id: number;
    text: string;
}

export interface CafeProps {
  address: string;
  canPayWith_card: boolean;
  canTakeCalls: boolean;
  city: string;
  coffeePrice: number;
  comments: CommentProps[];
  country: string;
  description: string;
  hasSockets: boolean;
  hasToilet: boolean;
  hasWifi: boolean;
  id: number;
  imgUrl: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  name: string;
  rating: number;
  seats: number;
}

export interface CafeResponse {
  ok: boolean;
  data: CafeProps[];
  message: string;
}

export const fetchData = async ({ path, method, body }: RequestOptions) => {
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
    const returnObj: CafeResponse = {
      ok: response.ok,
      message: data.message,
      data: data.data,
    };
    return returnObj;
  } catch (error) {
    return { ok: false, message: "Error: The server is not responding." };
  }
};
