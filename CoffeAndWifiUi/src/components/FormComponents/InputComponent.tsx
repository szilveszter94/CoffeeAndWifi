import { ChangeEventHandler } from "react";

interface InputProps {
    name: string;
    value: string | number | undefined;
    placeholder: string;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputComponent = ({name, value, placeholder, type, onChange}: InputProps) => {
  return (
    <>
      <label htmlFor={name} className="form-label fs-4">
        {placeholder}:
      </label>
      <input
        onChange={onChange}
        id={name}
        value={value}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="form-control custom-input fs-4"
      />
    </>
  );
};

export default InputComponent;
