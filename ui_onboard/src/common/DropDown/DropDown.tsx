import React, { useState, useRef, useEffect } from "react";
import "../../styles/drop-down-menu.css";
// import downArrow from "../../Assets/down-arrow.svg";
const image = require("../../Assets/down-arrow1.png")
interface Props {
  options?: Array<any>;
  label?: string;
  id?: string;
  value?: string;
  handleChange: (value: string) => void;
  showLabel: boolean;
  noOptionsText?: string;
  className?: string; //Additional CSS classes for the component
}

export const DropDown: React.FC<Props> = ({
  value,
  options,
  id,
  label,
  handleChange,
  showLabel,
  noOptionsText,
  className,
}) => {
  //showOptions variable and setShowOptions method for showing/hiding the Options
  const [showOptions, setShowOptions] = useState<boolean>(false);
  var dropDownOptions: Array<string> = [];
  // for received options
  if (options) {
    dropDownOptions = options;
  } else {
    // when no options were send to dropdown components
    //  and no valid [dropDownFor] parameter was received
    dropDownOptions = ["Options unavailable"];
  }

  // creating a mutable ref object using useRef
  // to handle hiding the drop-down options
  // when user clicks outside the drop-down options
  const wrapperRef = useRef<any>(null);

  // useEffect to render the component with the new values
  // based on the ref parameter passed to the function
  useEffect(
    () => {
      // event handler that will update the show drop-down options value in state
      const handleClickOutside = (event: any) => {
        // hide options only if the clicked element is outside the current component
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          // to hide the options
          setShowOptions(false);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    // only apply update if the [wrapperRef] value changes
    [wrapperRef]
  );

  return (
    // Main
    <div
      className="drop-down-menu-main-container no-select"
      style={{ width: "100%", marginTop: "-2px" }}
    >
      {/* Label */}

      {showLabel && (
        <label
          className="dropdown_label_menu"
          htmlFor={id + "_element"}
        >
          {label}
        </label>
      )}

      <div
        id={id + "-drop-down-menu-main"}
        className="drop-down-menu-main no-select"
        // for hiding the dropdown options when user clicks outside
        // assigning a reference of useRef to this List
        ref={wrapperRef}
      >
        {/* Selected value */}
        <div
          className="selected-option-menu"
          id={id + "-selected-option-menu"}
          // to show/hide the dropdown options
          onClick={() => setShowOptions(!showOptions)}
        >
          {/* label / selected value */}
          <p
            id={id + "-selected-option-menu-text"}
            className="selected-option-menu-text no-select"
          >
            {value && value.length !== 0 ? value : label}
          </p>
          {/* down arrow icon */}
          <img
            id={id + "-drop-down-down-edit"}
            src={image}
            alt="Down Arrow"
            className="edit-menu-icon"
          />
        </div>
        {/* shows options based on the state variable value */}
        <ul
          id={id + "-drop-down-menu-list"}
          className={
            showOptions ? "drop-down-menu-list" : "hidden-drop-down-menu-list"
          }
        >
          {/* Mapping the Options */}
          {showOptions ? (
            dropDownOptions.length > 0 ? (
              dropDownOptions.map((option: any, index) =>
                typeof option === "object" ? (
                  <div
                    id={id + "-" + option + "-drop-down-menu-option"}
                    key={id + option.value + "-div"}
                  >
                    {/* The Option value */}
                    <li
                      onClick={() => {
                        // does not call the handleChange if no options are available
                        // and if the option displayed has value ==> Options unavailable
                        if (option !== "Options unavailable") {
                          handleChange(option);
                        }
                        setShowOptions(!showOptions);
                      }}
                      id={id + "-" + option.value + "-drop-down-option-li"}
                      key={id + option.value + "-li"}
                      className={
                        "drop-down-menu-option no-select" +
                        (value === option.label
                          ? " drop-down-menu-selected-option"
                          : "")
                      }
                    >
                      {option.label}
                    </li>
                    {/* horizontal Line */}
                    {index !== dropDownOptions.length - 1 && (
                      <hr
                        id={
                          id +
                          "-" +
                          option.value +
                          "-drop-down-menu-option-line"
                        }
                        key={id + option.value + "-line"}
                        className="drop-down-menu-option-line"
                      ></hr>
                    )}
                  </div>
                ) : (
                  // Individual List Item from Options of DropDown
                  <div
                    id={id + "-" + option + "-drop-down-menu-option"}
                    key={id + option + "-div"}
                    className={"input " + className}
                  >
                    {/* The Option value */}
                    <li
                      onClick={() => {
                        // does not call the handleChange if no options are available
                        // and if the option displayed has value ==> Options unavailable
                        if (option !== "Options unavailable") {
                          handleChange(option);
                        }
                        setShowOptions(!showOptions);
                      }}
                      id={id + "-" + option + "-drop-down-option-li"}
                      key={id + option + "-li"}
                      className={
                        "drop-down-menu-option" +
                        (value === option
                          ? " drop-down-menu-selected-option"
                          : "")
                      }
                    >
                      {option}
                    </li>
                    {/* horizontal Line */}
                    {index !== dropDownOptions.length - 1 && (
                      <hr
                        id={id + "-" + option + "-drop-down-menu-option-line"}
                        key={id + option + "-line"}
                        className="drop-down-menu-option-line"
                      ></hr>
                    )}
                  </div>
                )
              )
            ) : (
              <p className="drop-down-menu-option">
                {noOptionsText ? noOptionsText : "No Options present"}
              </p>
            )
          ) : null}
        </ul>
      </div>
    </div>
  );
};
