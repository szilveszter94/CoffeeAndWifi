/* eslint-disable @typescript-eslint/no-explicit-any */
import "./PrimaryButton.scss";

interface ButtonProps {
  text: string;
  onClick?: () => any;
  type?: "submit" | "reset" | "button";
  className?: string;
}

const PrimaryButton = ({ text, onClick, type, className }: ButtonProps) => {
  return (
    <button type={type} className={`primary-button ${className && className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
