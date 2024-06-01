import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { TextField } from "@mui/material";

export const FormInputText = ({
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
        <TextField
          sx={{
            backgroundColor: "#E8DCCC",
          }}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          inputProps={{ type }}
        />
      )}
    />
  );
};
