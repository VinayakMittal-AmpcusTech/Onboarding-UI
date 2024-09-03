//Ajay Bagul - [20-07-23] - Model common component made for reusability

import React from "react";
import "../../styles/modal.css";
import CloseIcon from "@mui/icons-material/Close";
//Props interface. Defines all the required props by the component
interface Props {
  modalStyle?: React.CSSProperties; //Style object for modal
  modalClass?: string; //Class props for the main modal container
  showModal: boolean; //toggle modal props(mandatory)
  isFlexible?: boolean; // if true then makes the modal full device size in smaller devices else small with backdrop
  showHeader?: boolean; // if true then adds header at the top of the modal
  headerTitle?: string; // shows the title of the modal and only when showHeader is true
  showBackButton?: boolean; // shows back button on the header if true else not
  showBBPSLogo?: boolean; // shows BBPS logo on the header if true else not
  handleBackClick?: any; // handle the action when back button is clicked
  showModalHeader?: boolean;
  modalHeader?: string;
  topRightCloseButtonID?: string;
  children: React.ReactNode;
}

//Common Modal Component
export const Modal: React.FC<Props> = ({
  modalStyle,
  modalClass,
  children,
  showModal,
  isFlexible,
  showHeader,
  handleBackClick,
  modalHeader,
  showModalHeader,
  topRightCloseButtonID,
}) => {
  return (
    <div
      id="modal"
      className="modal-background"
      style={showModal ? {} : { display: "none" }}
    >
      <div
        id="modal-children"
        className={`modal-layout ${modalClass ? modalClass : ""} ${
          isFlexible ? "flexible" : ""
        } ${showHeader ? "modal-header" : ""}`}
        style={modalStyle ? modalStyle : {}}
      >
        {showModalHeader && (
          <div className="modal-header">
            <div className="header">{modalHeader}</div>
            <div
              id={topRightCloseButtonID ? topRightCloseButtonID : "x-button"}
              className="x-button"
              onClick={handleBackClick}
            >
              <CloseIcon />
            </div>
          </div>
        )}

        <div className="modal-child-container" id="modal-child-container">
          {children}
        </div>
      </div>
    </div>
  );
};
