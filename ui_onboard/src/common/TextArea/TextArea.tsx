//Ajay Bagul - [20-07-23] - text area common component made for reusability

import React from "react";

interface Props {
  value: string | number | readonly string[] | undefined; //value of the textarea
  placeholder: string; //placeholder text
  styles?: object; //additional styles object
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; //onChange event handler
  label?: string; //Label Text
  id?: string; //Id of the textarea. Would be postfixed with _element
  className?: string; //Additional CSS classes for the component
  disabled?: boolean;
}

export const TextArea: React.FC<Props> = ({
  label,
  placeholder,
  handleChange,
  id,
  className,
  styles,
  value,
  disabled,
}) => {
  return (
    <div style={{margin:"auto" ,width: "90%"}}>
      <label className="label" htmlFor={id + "_element"}>
        {label}
      </label>
      <textarea
        value={value}
        id={id + "_element"}
        placeholder={placeholder}
        className={"input " + className}
        style={styles ? styles : {}}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
