import { Box, Stack, Typography } from "@mui/material";

/* -------- */
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/* -------- */
import "react-loading-skeleton/dist/skeleton.css";
import { IMainButton } from "../../models/mainButton.model";
import MainButton from "./MainButton";

/* -------- */
import icon from "../../assets/logo.svg";
import useUser from "../../hooks/api/useUser";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function NavBar({ Buttons, title }: any) {
  const navigate = useNavigate();
  const { setAuth }: any = useAuth();
  const [, , removeCookie] = useCookies();
  const [user, setUser, isLoading] = useUser();

  const handleLogout = () => {
    setAuth({
      token: "",
    });
    setUser({});
    removeCookie("token");
    navigate("/login", { replace: true });
  };

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
            handler={handleLogout}
          ></MainButton>
        </Stack>
        <SkeletonTheme baseColor="transparent" highlightColor="#0A0A0A80">
          <Box order={{ xl: 1, xs: 2 }} width={{ xl: "100%" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
                marginLeft: { xl: "26px" },
                textAlign: { xl: "start", xs: "center" },
              }}
            >
              {isLoading ? <Skeleton /> : user?.fullName}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#0A0A0A80",
                marginLeft: { xl: "26px" },
                textAlign: { xl: "start", xs: "center" },
              }}
            >
              {title ? (
                title
              ) : isLoading ? (
                <Skeleton />
              ) : (
                user?.restaurantId?.name.toUpperCase()
              )}
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
              {Buttons.map((btn: IMainButton) => (
                <MainButton
                  width={btn.width}
                  text={btn.text}
                  Icon={btn.Icon}
                  handler={btn.handler}
                  state={btn.state}
                  key={btn.text}
                  align={btn.align}
                />
              ))}
            </Stack>
          </Box>
        </SkeletonTheme>
      </Stack>
      <Stack
        spacing={"16px"}
        order={{ xl: 2, xs: 4 }}
        sx={{
          display: { xl: "none", xs: "block" },
        }}
        direction={"row"}
        justifyContent={"space-between"}
      >
        {Buttons.map((btn: IMainButton) => (
          <MainButton
            width={btn.width}
            text={btn.text}
            Icon={btn.Icon}
            handler={btn.handler}
            state={btn.state}
            key={btn.text}
          />
        ))}
      </Stack>
    </Stack>
  );
}
