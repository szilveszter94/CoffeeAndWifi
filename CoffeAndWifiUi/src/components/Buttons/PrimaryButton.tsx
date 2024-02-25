/* eslint-disable @typescript-eslint/no-explicit-any */
import "./PrimaryButton.css";

interface buttonProps {
    text: string;
    onClick: () => any;
}

const PrimaryButton = ({text, onClick} : buttonProps) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default PrimaryButton