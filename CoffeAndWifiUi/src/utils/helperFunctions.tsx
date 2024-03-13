import { format } from "date-fns";

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createGoogleMapFromLatLong = (
  lat: number | "",
  long: number | ""
) => {
  return `https://maps.google.com/maps?q=${lat},${long}&z=16&output=embed`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = format(date, "yyyy.MM.dd HH:mm:ss");

  return formattedDate;
};
