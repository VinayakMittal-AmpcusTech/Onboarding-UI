//Ajay bagul - [20-07-23] - Float Label common component made for reusability

import React, { useState } from "react";
import "../../styles/float-label.css";
interface Props {
  value: string | any | number | readonly string[] | undefined; //value of the input field
  placeholder?: string; //placeholder text
  styles?: React.CSSProperties; //additional styles object
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; //onChange event handler
  label?: string; //Label Text
  type?: "float" | "normal" | "date"; //Type of input field. By default, text

  className?: string; //Additional CSS classes for the component
  disabled?: boolean;
  myStyle?: String;
}

export const FloatLabel: React.FC<Props> = ({
  label,
  placeholder,
  handleChange,
  type,
  className,
  styles,
  value,
  disabled,
  myStyle,
}) => {
  const [focus, setFocus] = useState(false);
  const labelClass =
    focus || (value && value !== 0) ? "label label-float" : "label";

  return (
    <div
      className={"float-label " + myStyle}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <label
        className={type == "float" ? labelClass : "label"}
        style={{ color: "#1976D2" }}
      >
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        type={type ? type : "text"}
        className={"input " + className}
        style={
          styles
            ? styles
            : { fontSize: "14px", height: "40px", textAlign: "left" }
        }
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
