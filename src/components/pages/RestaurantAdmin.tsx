import { Box, Stack, Typography } from "@mui/material";
import icon from "../../assets/logo.svg";
import MainButton from "../shared/MainButton";

import CategorySVG from "../../assets/svgs/CategorySVG";
import MenuSVG from "../../assets/svgs/MenuSVG";
import PersonSVG from "../../assets/svgs/PersonSVG";
import TomatoSVG from "../../assets/svgs/TomatoSVG";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RestaurantAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("ss");
  }, []);

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
            User Name
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#0A0A0A80",
              marginBottom: "80px",
            }}
          >
            Restaurant Name
          </Typography>

          <Stack
            spacing={"16px"}
            sx={{
              marginBottom: { xl: "50%", xs: "10%" },
            }}
          >
            <MainButton
              width={"100%"}
              text={"Menu"}
              Icon={MenuSVG}
              handler={() => {
                navigate("menu");
              }}
              state={location.pathname.split("/")[2] === "menu"}
            ></MainButton>
            <MainButton
              width={"100%"}
              text={"Cashier"}
              Icon={PersonSVG}
              handler={() => {
                navigate("cashier");
              }}
              state={location.pathname.split("/")[2] === "cashier"}
            ></MainButton>
            <MainButton
              width={"100%"}
              text={"Ingredients"}
              Icon={TomatoSVG}
              handler={() => {
                navigate("ingredients");
              }}
              state={location.pathname.split("/")[2] === "ingredients"}
            ></MainButton>
            <MainButton
              width={"100%"}
              text={"Categories"}
              Icon={CategorySVG}
              handler={() => {
                navigate("category");
              }}
              state={location.pathname.split("/")[2] === "category"}
            ></MainButton>
          </Stack>

          <Stack spacing={"32px"} alignItems={"center"}>
            <MainButton
              width={"100%"}
              text={"Log Out"}
              state={true}
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
        <Outlet />
      </Stack>
    </Stack>
  );
}
