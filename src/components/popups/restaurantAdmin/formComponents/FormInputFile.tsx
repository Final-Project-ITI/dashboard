import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { Box, Button, Input, TextField } from "@mui/material";

export const FormInputFile = ({
  name,
  control,
  label,
  type,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Button
          variant="contained"
          component="label"
          fullWidth
          color="secondary"
        >
          Choose File
          <input onChange={onChange} value={value} type="file" hidden />
        </Button>
      )}
    />
  );
};
