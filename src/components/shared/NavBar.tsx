import { Box, Stack, Typography } from "@mui/material";

/* -------- */
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

/* -------- */
import icon from "../../assets/logo.svg";

/* -------- */
import { UserContext } from "../../App";
import { USER_URL } from "../../utils/urls";
import MainButton from "./MainButton";

export default function NavBar({ Buttons, title }: any) {
  const navigate = useNavigate();
  const { setAuth }: any = useAuth();
  const [, , removeCookie] = useCookies();
  const axiosPrivate = useAxiosPrivate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setAuth({
      token: "",
    });
    setUser({});
    removeCookie("token");
    navigate("/login", { replace: true });
  };

  const handleGetUserData = async () => {
    try {
      const { data } = await axiosPrivate.get(USER_URL);
      setUser(data);
    } catch (e) {}
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return (
    <Stack
      sx={{
        backgroundColor: "#E8DCCC",
        width: { xl: "18%", xs: "100%" },
        padding: "20px",
      }}
    >
      <Stack
        justifyContent={{ xl: "space-around", xs: "space-between" }}
        alignItems={{ xl: "space-around", xs: "center" }}
        direction={{ xl: "column", xs: "row" }}
        height={"100%"}
        alignSelf={"stretch"}
      >
        <Box order={{ xl: 4, xs: 1 }}>
          <img
            src={icon}
            title="logo"
            style={{
              objectFit: "cover",
              width: "80px",
              height: "80px",
            }}
          />
        </Box>

        <Stack
          spacing={"32px"}
          alignItems={"center"}
          order={{ xl: 3, xs: 3 }}
          width={{ xl: "100%" }}
        >
          <MainButton
            width={{ xl: "100%", xs: "150px" }}
            text={"Log Out"}
            state={true}
            handler={handleLogout}
          ></MainButton>
        </Stack>

        <Box order={{ xl: 1, xs: 2 }} width={{ xl: "100%" }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "8px",
              marginLeft: { xl: "36px" },
              textAlign: { xl: "start", xs: "center" },
            }}
          >
            {user?.fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#0A0A0A80",
              marginLeft: { xl: "36px" },
              textAlign: { xl: "start", xs: "center" },
            }}
          >
            {title ? title : user?.restaurantId?.name.toUpperCase()}
          </Typography>

          <Stack
            spacing={"16px"}
            order={{ xl: 2, xs: 4 }}
            width={"100%"}
            marginTop={{ xl: "80px" }}
            sx={{
              display: { xl: "block", xs: "none" },
            }}
          >
            {Buttons.map((btn: any) => btn)}
          </Stack>
        </Box>
      </Stack>
      <Stack
        spacing={"16px"}
        order={{ xl: 2, xs: 4 }}
        sx={{
          display: { xl: "none", xs: "block" },
        }}
        direction={"row"}
      >
        {Buttons.map((btn: any) => btn)}
      </Stack>
    </Stack>
  );
}
