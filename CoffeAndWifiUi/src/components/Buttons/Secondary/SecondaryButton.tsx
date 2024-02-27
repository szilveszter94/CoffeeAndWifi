/* eslint-disable @typescript-eslint/no-explicit-any */
import "./SecondaryButton.scss";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | undefined;
  className: string;
  onClick?: () => any;
}

const SecondaryButton = ({ text, type, className, onClick }: ButtonProps) => {
  const buttonClass = `secondary-button fs-3 ${className}`;
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
