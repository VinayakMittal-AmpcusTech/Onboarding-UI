
//Ajay Bagul - [20-07-23] - check box common component made for reusability
import React from "react";
import "../../styles/checkbox.css";
interface Props {
  label: string;
  checked: boolean;
  id: string;
  style?: any;
  value?: string;
  handleChange:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

export const CheckBox: React.FC<Props> = ({
  label,
  id,
  checked,
  handleChange,
  style,
  value,
}) => {
  return (
    <div style={{ backgroundColor: "pink" }}>
      <label htmlFor={id + "_element"} className="container-checkbox">
        {label}
        <input
          onChange={handleChange}
          id={id + "_element"}
          type="checkbox"
          checked={checked}
          style={style ? style : null}
          // className="checkbox-wrapper"
          value={value ? value : "checkbox"}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};
