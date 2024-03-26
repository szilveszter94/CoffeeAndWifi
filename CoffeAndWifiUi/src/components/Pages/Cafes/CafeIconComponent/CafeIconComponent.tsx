import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./CafeIconComponent.scss";

interface CafeComponentProps {
  hasProperty: boolean;
  icon: IconDefinition;
  text: string;
}

const CafeIconComponent = ({ hasProperty, icon, text }: CafeComponentProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSetHover = (isHovered: boolean) => {
    setIsHovered(isHovered);
  };

  return (
    <div className="col-2 cafe-property-icon-container my-2">
      <h4
        onMouseEnter={() => handleSetHover(true)}
        onMouseLeave={() => handleSetHover(false)}
      >
        {hasProperty ? (
          <FontAwesomeIcon
            className={`text-success fs-2 ${isHovered && "hovered"}`}
            icon={icon}
          />
        ) : (
          <span className="not-available-span">
            <FontAwesomeIcon
              className="not-available-icon text-danger fs-1"
              icon={faSlash}
            />
            <FontAwesomeIcon
              className={`text-white fs-2 ${isHovered && "hovered"}`}
              icon={icon}
            />
          </span>
        )}
      </h4>
      {isHovered && (
        <h6
          className={`hover-text ${
            hasProperty ? "text-success" : "text-danger"
          }`}
        >
          {text}
        </h6>
      )}
    </div>
  );
};

export default CafeIconComponent;
