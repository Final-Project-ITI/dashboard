import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { Box, Button, Input, TextField } from "@mui/material";

export const FormInputFile = ({
  name,
  control,
  label,
  type,
  register,
}: any) => {
  return (
    <Button variant="contained" component="label" fullWidth color="secondary">
      Choose File
      <input ref={register} name={name} type="file" hidden />
    </Button>
  );
};
