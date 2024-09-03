//Ajay Bagul - [20-07-23] - toast message common component made for reusability
import React, { useEffect, useState } from "react";
//Props interface. Defines all the required props by the component
interface IProps {
  message: string; //message for the user to see
  time?: number | 1500; //time till the snackbar will be visible - default (1.5 seconds)
}
export const ToastMessage: React.FC<IProps> = ({ message, time }) => {
  // Stores the class name value for the snackbar toast message to be visible
  const [snackbar, setSnackBar] = useState<string>("show");
  //After the component mounts
  useEffect(() => {
    //   If there is a timeout from the user then after that time out hide the snack bar message
    setTimeout(() => {
      // Set snackbar to empty
      setSnackBar("");
    }, time);
  }, [time]);
  return (
    // Parent container for toast message
    <div
      id="snackbar-container"
      className={`snackbar-parent ${snackbar ? snackbar : ""}`}
    >
      <div id="snackbar" className={`snackbar-content`}>
        {/* Mapping the original message in the snack bar */}
        {message}
      </div>
    </div>
  );
};
