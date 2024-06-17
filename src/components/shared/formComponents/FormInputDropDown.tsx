import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/* -------- */
import { Controller } from "react-hook-form";

/* -------- */
import React from "react";
import { FormInputProps } from "./FormInputProps";

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  categories,
}) => {
  const generateSingleOptions = () => {
    return categories?.map((category: any) => {
      return (
        <MenuItem key={category._id} value={category._id}>
          {category.name}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl
      size={"small"}
      sx={{
        width: "100%",
        backgroundColor: "#E8DCCC",
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
