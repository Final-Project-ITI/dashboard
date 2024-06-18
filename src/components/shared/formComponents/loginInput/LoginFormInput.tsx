import { TextField, Typography } from "@mui/material";

/* -------- */
import { Controller } from "react-hook-form";

/* -------- */
import { FormInputProps } from "../FormInputProps";

export const LoginFormInput = ({
  name,
  control,
  type,
  register,
  validation,
}: FormInputProps) => {
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
        <>
          <TextField
            {...register(name, validation)}
            sx={{
              backgroundColor: "#F3ECE4",
              borderRadius: "50px",
              ...borderStyle,
            }}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            inputProps={{ type }}
          />

          {error ? (
            <Typography color={"#D74339"} marginLeft={"16px"} fontSize={"12px"}>
              {error.message}
            </Typography>
          ) : (
            ""
          )}
        </>
      )}
    />
  );
};
