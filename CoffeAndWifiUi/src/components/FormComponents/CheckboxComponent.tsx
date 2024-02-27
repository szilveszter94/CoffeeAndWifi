import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";

interface CheckboxProps {
    name: string;
    checked: boolean;
    icon: IconDefinition
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const CheckboxComponent = ({name, checked, icon, onChange}: CheckboxProps) => {
  return (
    <>
      <label htmlFor={name} className="form-label fs-3">
        <FontAwesomeIcon className="fs-3 me-2" icon={icon} />
      </label>
      <input
        onChange={onChange}
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        className="form-check-input custom-input fs-3"
      />
    </>
  );
};

export default CheckboxComponent;
