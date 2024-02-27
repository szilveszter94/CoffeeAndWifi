/* eslint-disable @typescript-eslint/no-explicit-any */
import "./PrimaryButton.scss";

interface ButtonProps {
  text: string;
  onClick?: () => any;
  type?: "submit" | "reset" | "button";
}

const PrimaryButton = ({ text, onClick, type }: ButtonProps) => {
  return (
    <button type={type} className="primary-button fs-5" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
