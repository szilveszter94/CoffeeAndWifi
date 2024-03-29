import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface StarComponentProps {
  rating: number | "";
  name: string;
}

const renderStars = (rating: number | "") => {
  if (!rating){
    return [];
  }
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const stars = [];

  // Render full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        className="fs-2 me-2 text-warning"
        icon={faStar}
      />
    );
  }

  // Render half star if decimal part is greater than 0.5
  if (decimalPart >= 0.5) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        className="fs-2 me-2 text-warning"
        icon={faStarHalfAlt}
      />
    );
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        className="fs-2 me-2 text-warning"
        icon={faStarRegular}
        type="regular"
      />
    );
  }

  return stars;
};

const StarComponent = ({ rating, name }: StarComponentProps) => {
  return (
    <div className="mb-5">
      <h1>{name}</h1>
      <h3>Rating: {rating}</h3>
      <h2>
        <span className="ms-3">{renderStars(rating)}</span>
      </h2>
    </div>
  );
};

export default StarComponent;
