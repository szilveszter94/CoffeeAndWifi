/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ButtonWithIcon.scss";

interface ButtonProps {
  text: string;
  onClick?: () => any;
  type?: "submit" | "reset" | "button";
  icon: IconDefinition;
  buttonClass?: string;
  iconClass?: string;
}

const ButtonWithIcon = ({
  type,
  buttonClass,
  iconClass,
  text,
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button-with-icon ${buttonClass && buttonClass}`}
      onClick={onClick}
    >
      <FontAwesomeIcon className={iconClass && iconClass} icon={icon} />
      {text}
    </button>
  );
};

export default ButtonWithIcon;
