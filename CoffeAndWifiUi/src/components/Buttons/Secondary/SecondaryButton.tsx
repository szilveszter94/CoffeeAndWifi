/* eslint-disable @typescript-eslint/no-explicit-any */
import "./SecondaryButton.scss";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | undefined;
  className: string;
  onClick?: () => any;
}

const SecondaryButton = ({ text, type, className, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`secondary-button  ${className && className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
