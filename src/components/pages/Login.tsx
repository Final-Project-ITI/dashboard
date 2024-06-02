import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormInput } from "../loginInput/LoginFormInput";

interface IFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundColor: "#F3ECE4",
      }}
    >
      <Box
        width={"35%"}
        sx={{
          backgroundColor: "#E8DCCC",
          border: "1px solid #D74339",
          borderRadius: "25px",
          padding: "40px 64px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#D74339",
            textAlign: "center",
          }}
        >
          Log In
        </Typography>
        <Stack spacing={"8px"}>
          <Box>
            <Typography sx={labelStyle}>E-Mail</Typography>
            <LoginFormInput
              name="email"
              control={control}
              label="E-Mail"
              type="email"
            />
          </Box>

          <Box>
            <Typography sx={labelStyle}>Password</Typography>
            <LoginFormInput
              name="password"
              control={control}
              label="Password"
              type="password"
            />
          </Box>
        </Stack>

        <Stack
          marginTop={"24px"}
          spacing={"40px"}
          width={"100%"}
          justifyContent={"center"}
          direction={"row"}
        >
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={"contained"}
            fullWidth
            style={{
              borderRadius: "50px",
            }}
          >
            Log In
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
