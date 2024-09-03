//chetan Patil - [20/7/2023] - Created reusable drop down menu

import React from "react";
import "../../styles/date-picker.css";
interface Props {
  label: string;
  id?: string;
  value: string;
  className?: string; //Additional CSS classes for the component
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker: React.FC<Props> = ({
  id,
  label,
  handleChange,
  value,
  className,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <label className="date-picker-label" htmlFor={id + "_element"}>
        {label}
      </label>
      <input
        value={value}
        className={"date-picker"}
        type="date"
        onChange={handleChange}
        name={id + "_element"}
        id={id + "_element"}
      />
    </div>
  );
};
