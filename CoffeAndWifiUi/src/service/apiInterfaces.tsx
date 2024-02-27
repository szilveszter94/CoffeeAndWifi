/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestOptions {
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
    canPayWithCard: boolean;
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
  
  export interface CafeListResponse {
    ok: boolean;
    data: CafeProps[];
    message: string;
  }

  export interface SingleCafeResponse {
    ok: boolean;
    data: CafeProps;
    message: string;
  }