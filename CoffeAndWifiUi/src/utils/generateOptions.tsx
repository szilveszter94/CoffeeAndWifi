export const generateRatings = () => {
  const ratings = [];
  for (let i = 0; i < 6; i++) {
    ratings.push(<option key={`rating${i}`}>{i}</option>);
  }
  return ratings;
};

export const generateSeats = () => {
  const seats = [];
  for (let i = 0; i < 501; i += 5) {
    seats.push(<option key={`seat${i}`}>{i}</option>);
  }
  return seats;
};
