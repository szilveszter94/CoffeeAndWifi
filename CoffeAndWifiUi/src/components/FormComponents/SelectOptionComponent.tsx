import { ChangeEventHandler } from "react";
import { capitalizeFirstLetter } from "../../utils/helperFunctions";

interface OptionProps {
  name: string;
  value: number | string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: JSX.Element[];
}

const SelectOptionComponent = ({
  name,
  value,
  onChange,
  options,
}: OptionProps) => {
  return (
    <>
      <label htmlFor={name} className="form-label fs-4">
        {capitalizeFirstLetter(name)}:
      </label>
      <select
        name={name}
        id={name}
        value={value}
        required
        onChange={onChange}
        className="form-select custom-input fs-4"
      >
        <option value=""></option>
        {options}
      </select>
    </>
  );
};

export default SelectOptionComponent;
