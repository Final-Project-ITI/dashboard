import { Box, Stack, Typography } from "@mui/material";
import icon from "../../assets/logo.svg";
import MainButton from "../shared/MainButton";

import PersonSVG from "../../assets/svgs/PersonSVG";

import RestaurantsTable from "../tables/mainAdmin/RestaurantsTable";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IUser } from "../../models/user.model";
import { USER_URL } from "../../utils/URLs";

export default function MainAdmin() {
  const navigate = useNavigate();
  const { setAuth }: any = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [, , removeCookie] = useCookies();
  const [admin, setAdmin] = useState<IUser>();

  function handleLogout() {
    setAuth({
      token: "",
    });
    removeCookie("token");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    handleGetAdminData();
  }, []);

  const handleGetAdminData = async () => {
    try {
      const { data } = await axiosPrivate.get(USER_URL);
      setAdmin(data);
    } catch (e) {}
  };

  return (
    <Stack height={"100vh"} direction={{ xl: "row", xs: "column" }}>
      <Stack
        sx={{
          backgroundColor: "#E8DCCC",
          width: { xl: "18%", md: "100%" },
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            marginTop: "80px",
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {admin?.fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#0A0A0A80",
              marginBottom: "80px",
            }}
          >
            Admin
          </Typography>

          <Stack>
            <Stack
              spacing={"16px"}
              sx={{
                marginBottom: { xl: "50%", xs: "10%" },
              }}
            >
              <MainButton
                width={"100%"}
                text={"Restaurants"}
                Icon={PersonSVG}
                state={true}
              ></MainButton>
            </Stack>

            <Stack spacing={"32px"} alignItems={"center"}>
              <MainButton
                width={"100%"}
                text={"Log Out"}
                state={true}
                handler={handleLogout}
              ></MainButton>

              <img
                src={icon}
                title="logo"
                style={{
                  objectFit: "cover",
                  width: "80px",
                  height: "80px",
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          backgroundColor: "#F3ECE4",
          width: { xl: "85%", md: "100%" },
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RestaurantsTable />
      </Stack>
    </Stack>
  );
}
