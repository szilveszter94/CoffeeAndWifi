import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSlash } from "@fortawesome/free-solid-svg-icons";

interface CafeComponentProps {
  hasProperty: boolean;
  icon: IconDefinition;
}

const CafeIconComponent = ({ hasProperty, icon }: CafeComponentProps) => {
  return (
    <div className="col-2">
      <h4>
        {hasProperty ? (
          <FontAwesomeIcon className="text-success fs-2" icon={icon} />
        ) : (
          <span className="not-available-span">
            <FontAwesomeIcon
              className="not-available-icon text-danger fs-1"
              icon={faSlash}
            />
            <FontAwesomeIcon className="text-white fs-2" icon={icon} />
          </span>
        )}
      </h4>
    </div>
  );
};

export default CafeIconComponent;
