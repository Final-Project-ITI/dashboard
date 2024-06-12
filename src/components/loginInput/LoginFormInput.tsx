import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { FormInputProps } from "../shared/formComponents/FormInputProps";

export const LoginFormInput = ({ name, control, type }: FormInputProps) => {
  const borderStyle = {
    "& .MuiInputBase-root": {
      borderRadius: "50px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D74339",
      },
      "&:hover fieldset": {
        borderColor: "#F3ECE4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiTextField-root": { borderRadius: "50px" },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          sx={{
            backgroundColor: "#F3ECE4",
            borderRadius: "50px",
            ...borderStyle,
          }}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          inputProps={{ type }}
        />
      )}
    />
  );
};
