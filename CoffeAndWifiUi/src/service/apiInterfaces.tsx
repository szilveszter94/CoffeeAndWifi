/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RequestOptions {
  path: string;
  method: string;
  body?: any;
}

export interface UserProps {
  email: string;
  id: string;
  userName: string;
}

export interface CommentProps {
  authorId: number;
  cafeId: number;
  date: string;
  id: number;
  text: string;
  user: UserProps;
}

export interface CafeProps {
  id: number;
  name: string;
  country: string;
  city: string;
  address: string;
  imgUrl: string;
  latitude: number | "";
  longitude: number | "";
  coffeePrice: number | "";
  rating: number | "";
  seats: number | "";
  description: string;
  canPayWithCard: boolean;
  canTakeCalls: boolean;
  hasSockets: boolean;
  hasToilet: boolean;
  hasWifi: boolean;
  comments: CommentProps[];
}

export interface BaseResponse {
  ok: boolean;
  data: CafeProps[];
  message: string;
  status: number;
}

export interface CommentResponse {
  ok: boolean;
  data: CommentProps;
  message: string;
  status: number;
}

export interface CommentWithUserProps {
  comment: CommentProps;
  user: UserProps;
}

export interface SingleCafeResponse {
  ok: boolean;
  data: { cafe: CafeProps; comments: CommentWithUserProps[] };
  message: string;
}

export interface LoginResponse {
  ok: boolean;
  data: loginData;
  message: string;
  status: number;
}

interface loginData {
  email: string;
  token: string;
  userName: string;
}
