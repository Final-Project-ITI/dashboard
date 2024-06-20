/* -------- */
import { Stack } from "@mui/material";

/* -------- */
import { Outlet, useNavigate } from "react-router-dom";
import CategorySVG from "../../assets/svgs/CategorySVG";
import HomeSVG from "../../assets/svgs/HomeSVG";
import MotorCycleSVG from "../../assets/svgs/MotorCycleSVG";
import { IMainButton } from "../../models/mainButton.model";
import NavBar from "../shared/NavBar";

export default function MainAdmin() {
  const navigate = useNavigate();

  const navBtns: IMainButton[] = [
    {
      width: { xl: "100%" },
      text: "Restaurants",
      Icon: HomeSVG,
      state: location.pathname.split("/")[1] === "restaurants",
      handler: () => {
        navigate("restaurants");
      },
    },
    {
      width: { xl: "100%" },
      text: "Categories",
      Icon: CategorySVG,
      state: location.pathname.split("/")[1] === "category",
      handler: () => {
        navigate("category");
      },
    },
    {
      width: { xl: "100%" },
      text: "Delivery",
      Icon: MotorCycleSVG,
      state: location.pathname.split("/")[1] === "delivery",
      handler: () => {
        navigate("delivery");
      },
    },
  ];

  return (
    <Stack height={"100vh"} direction={{ xl: "row", xs: "column" }}>
      <NavBar Buttons={navBtns} title={"Admin"} />

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
