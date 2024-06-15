import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { LoginFormInput } from "../loginInput/LoginFormInput";
import { LOGIN_URL } from "../../utils/URLs";
import useAuth from "../../hooks/useAuth";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IPayload } from "../../models/payload.mode";

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

  const { setAuth }: any = useAuth();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const onSubmit = async (loginData: IFormInput) => {
    try {
      const res = await axios.post(LOGIN_URL, loginData);
      const token = await res.data.token;
      const userData: IPayload = jwtDecode(token);
      setAuth({ token });

      setCookie("token", token);

      switch (userData.role.name) {
        case "admin":
          navigate("/", { replace: true });
          break;
        case "restaurantAdmin":
          navigate("/restaurantAdmin", { replace: true });
          break;
        case "restaurantCashier":
          navigate("/restaurantCashier", { replace: true });
          break;
        default:
          throw new Error("unauthorized");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

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
        <Stack spacing={"8px"}>
          <Box>
            <Typography sx={labelStyle}>E-Mail</Typography>
            <LoginFormInput name="email" control={control} type="email" />
          </Box>

          <Box>
            <Typography sx={labelStyle}>Password</Typography>
            <LoginFormInput name="password" control={control} type="password" />
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
