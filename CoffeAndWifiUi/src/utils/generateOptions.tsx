export const generateRatings = () => {
  const ratings = [];
  for (let i = 0; i < 6; i++) {
    ratings.push(<option>{i}</option>);
  }
  return ratings;
};

export const generateSeats = () => {
  const ratings = [];
  for (let i = 0; i < 501; i += 5) {
    ratings.push(<option>{i}</option>);
  }
  return ratings;
};
