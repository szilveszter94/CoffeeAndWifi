/* eslint-disable @typescript-eslint/no-explicit-any */
import "./ButtonWithLogo.scss";

interface ButtonProps {
    type: "button" | "submit" | undefined;
    text: string;
    className: string;
    googleLogo: string;
    onClick?: () => any;
  }

const ButtonWithLogo = ({type, text, className, googleLogo, onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={`button-with-logo ${className && className}`}>
      <img src={googleLogo} alt="logo" />
      <span>{text}</span>
    </button>
  );
};

export default ButtonWithLogo;
