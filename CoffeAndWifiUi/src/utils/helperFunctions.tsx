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
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 1);
  const timeDifference = currentDate.getTime() - date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${
      secondsDifference !== 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 2592000) {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 31536000) {
    const monthsDifference = Math.floor(secondsDifference / 2592000);
    return `${monthsDifference} month${monthsDifference !== 1 ? "s" : ""} ago`;
  } else {
    const yearsDifference = Math.floor(secondsDifference / 31536000);
    return `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""} ago`;
  }
};
