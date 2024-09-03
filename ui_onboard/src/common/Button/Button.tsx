//Chetan Patil - [20-07-23] - button common component made for reusability

import React from "react";
import "../../styles/button.css";

//Props interface. Defines all the required props by the component
interface Props {
  value?: string; //Text on the button
  styles?: object; //additional styles object
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; //Onclick event handler of the button element
  id?: string; //Id of the input field. Would be postfixed with _element
  className?: string; //Additional CSS classes for the component
  disabled?: boolean;
}

//Common Button Component
export const Button: React.FC<Props> = ({
  handleClick,
  value,
  id,
  className,
  styles,
  disabled,
}) => {
  return (
    <div className="w-full   mb-3" style={{ opacity: disabled ? 0.5 : 1 }}>
      <button
        id={id + "_element"}
        className={"button " + className}
        style={styles ? styles : {}}
        onClick={handleClick}
        disabled={disabled}
      >
        {value}
      </button>
    </div>
  );
};
