//Chetan Patil - [20-07-23] - button Image common component made for reusability
import React from "react"
import "../../styles/button-image.css";
interface Props {
  value?: string; //Text on the button
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void; //Onclick event handler of the button element
  id?: string; //Id of the input field
  className?: string; //Additional CSS classes for the component
  imageSrc?: string; //Source of the image
  imageAlt?: string; //Alternative text if image is not visible
}
export const ButtonImage: React.FC<Props> = ({
  handleClick,
  value,
  id,
  className,
  imageSrc,
  imageAlt,
}) => {
  return (
    <button
      className={`image-button ${className}`}
      id={`${id}-image-button`}
      onClick={handleClick}
    >
      <img className="button-image-image" src={imageSrc} alt={imageAlt} />
      <p className="button-image-text" id={`${id}-text`}>
        {value}
      </p>
    </button>
  );
};
