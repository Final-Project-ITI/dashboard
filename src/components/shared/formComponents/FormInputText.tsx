import { TextField } from "@mui/material";

/* -------- */
import { Controller } from "react-hook-form";

/* -------- */
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({
  name,
  control,
  label,
  type,
  register,
  validation,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => (
        <TextField
          {...register(name, validation)}
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
          name={name}
        />
      )}
    />
  );
};
