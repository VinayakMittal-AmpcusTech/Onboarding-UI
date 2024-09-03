import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
interface IPopoverProps {
    button: JSX.Element;
    children?: JSX.Element;
    className?: string;
}
const PopoverComponent: React.FC<IPopoverProps> = ({ children, button, className }) => {
    return (
        <Popover>
            <PopoverHandler>
                {button}
            </PopoverHandler>
            <PopoverContent className={`absolute !z-[10000] ${className}`}>
                {children}
            </PopoverContent>
        </Popover >
    )
}
export default PopoverComponent
