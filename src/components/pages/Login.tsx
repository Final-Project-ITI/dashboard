import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/api/useLogin";

/* -------- */
import { IFormInputLogin } from "../../models/formInputs/formInputLogin.model";
import { regEmail } from "../../regex/regex";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------- */
import { DVLogin } from "../../utils/defaultValues";
import { LoginFormInput } from "../shared/formComponents/loginInput/LoginFormInput";

export default function Login() {
  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty, isValid },
  } = useForm<IFormInputLogin>({
    defaultValues: DVLogin,
    mode: "onChange",
  });

  const [onSubmit, error] = useLogin();

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  useEffect(() => {
    toast.error(error?.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }, [error]);

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
        width={{ xs: "65%", md: "50%", xl: "35%" }}
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
        <form>
          <Stack spacing={"8px"}>
            <Box>
              <Typography sx={labelStyle}>E-Mail</Typography>
              <LoginFormInput
                name="email"
                control={control}
                type="email"
                register={register}
                validation={{
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  pattern: {
                    value: regEmail,
                    message: "invalid email",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={labelStyle}>Password</Typography>
              <LoginFormInput
                name="password"
                control={control}
                type="password"
                register={register}
                validation={{
                  required: {
                    value: true,
                    message: "password is required",
                  },
                }}
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
              disabled={!isDirty || !isValid}
              style={{
                borderRadius: "50px",
              }}
              type="submit"
            >
              Log In
            </Button>
          </Stack>
        </form>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
