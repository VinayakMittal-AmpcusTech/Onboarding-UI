import React from "react";
import "../../styles/radio-button.css";

interface Props {
  label?: string;
  checked: boolean;
  id?: string;
  value?: string | number | readonly string[] | undefined;
  className?: string;
  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

export const RadioButton: React.FC<Props> = ({
  label,
  checked,
  id,
  value,
  className,
  handleChange,
}) => {
  return (
    <label htmlFor={id + "_element"} className="container-radio">
      {label}
      <input
        onChange={handleChange}
        id={id + "_element"}
        value={value}
        type="radio"
        className={"input " + className}
        checked={checked}
        name="radio"
      />
      <span className="checkmark"></span>
    </label>
  );
};
