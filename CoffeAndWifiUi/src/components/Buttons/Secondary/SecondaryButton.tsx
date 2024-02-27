import "./SecondaryButton.scss";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | undefined;
  className: string;
}

const SecondaryButton = ({ text, type, className }: ButtonProps) => {
    const buttonClass = `secondary-button fs-3 ${className}`;
  return (
    <button type={type} className={buttonClass}>
      {text}
    </button>
  );
};

export default SecondaryButton;
