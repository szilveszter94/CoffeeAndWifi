/* eslint-disable @typescript-eslint/no-explicit-any */
import "./PrimaryButton.scss";

interface buttonProps {
  text: string;
  onClick: () => any;
}

const PrimaryButton = ({ text, onClick }: buttonProps) => {
  return (
    <button className="primary-button fs-5" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
