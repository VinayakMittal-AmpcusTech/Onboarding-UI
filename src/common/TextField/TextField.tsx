
//Ajay Bagul - [20-07-23] - text field common component made for reusability

import React, { FocusEventHandler } from "react";
import "../../styles/text-field.css";

//Props interface. Defines all the required props by the component
interface Props {
  value: string | number | readonly string[] | undefined; //value of the input field
  placeholder?: string; //placeholder text
  styles?: object; //additional styles object
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; //onChange event handler
  label?: string; //Label Text
  type?: string; //Type of input field. By default, text

  className?: string; //Additional CSS classes for the component
  disabled?: boolean;
  handleBlur?: FocusEventHandler<any> | undefined;
}
//Common TextField Component
export const TextField: React.FC<Props> = ({
  label,
  placeholder,
  handleChange,
  type,
  className,
  styles,
  value,
  handleBlur,
  disabled,
}) => {
  return (
    <div style={{ width: "99%", opacity: disabled ? 0.4 : 1 }}>
      <label className="label-text-filed" htmlFor={"_element"}>
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        type={type ? type : "text"}
        className={"input " + className}
        style={styles ? styles : { textAlign: "left", borderTopStyle: "none", borderRightStyle: "none", borderLeftStyle: "none" }}
        onChange={handleChange}
        disabled={disabled}
        onBlur={handleBlur}
      />
    </div>
  );
};
