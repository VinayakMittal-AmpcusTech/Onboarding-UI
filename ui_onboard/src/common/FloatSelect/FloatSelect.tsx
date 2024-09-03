import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
interface Props {
  value: any;
  placeholder?: string; //placeholder text
  styles?: React.CSSProperties; //additional styles object
  handleChange: (event: SelectChangeEvent<HTMLInputElement>) => void;
  // onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string; //Label Text
  id?: "selact" | "normal" | "date"; //Type of input field. By default, text
  labelId: string;
  className?: string; //Additional CSS classes for the component
  disabled?: boolean;
  myStyle?: String;
  options: any[];
}
// const [age, setAge] = React.useState<any>("");

export const FloatSelect: React.FC<Props> = ({
  placeholder,
  handleChange,
  label,
  id,
  className,
  styles,
  value,
  disabled,
  myStyle,
  labelId,
  options,
}) => {
  const [focus, setFocus] = useState(false);
  // const selectClass =
  //   focus || (value && value !== 0)
  //     ? "select select-float"
  //     : "select";

  return (
    <div
      className={"float-label " + myStyle}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <FormControl style={{ width: "99%", opacity: disabled ? 0.4 : 1 }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          style={{ backgroundColor: "white", color: "#1976D2" }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="label"
          className={"input " + className}
          style={styles ? styles : { fontSize: "12px", height: "10px" }}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          MenuProps={{
            style: {
              maxHeight: "200px", // Adjust the height as needed
            },
          }}
        >
          {options?.map((e: any) => (
            <MenuItem value={e?.value}>{e?.label}</MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
    </div>
  );
};
