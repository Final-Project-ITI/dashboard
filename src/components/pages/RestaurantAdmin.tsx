/* -------- */
import { Stack } from "@mui/material";

/* -------- */
import { Outlet, useNavigate } from "react-router-dom";

/* -------- */
import CategorySVG from "../../assets/svgs/CategorySVG";
import MenuSVG from "../../assets/svgs/MenuSVG";
import PersonSVG from "../../assets/svgs/PersonSVG";
import TomatoSVG from "../../assets/svgs/TomatoSVG";
import { IMainButton } from "../../models/mainButton.model";
import NavBar from "../shared/NavBar";

export default function RestaurantAdmin({ setUser }: any) {
  const navigate = useNavigate();

  const navBtns: IMainButton[] = [
    {
      width: { xl: "100%" },
      text: "Menu",
      Icon: MenuSVG,
      state: location.pathname.split("/")[2] === "menu",
      handler: () => {
        navigate("menu");
      },
      align: "flex-start",
    },
    {
      width: { xl: "100%" },
      text: "Cashier",
      Icon: PersonSVG,
      state: location.pathname.split("/")[2] === "cashier",
      handler: () => {
        navigate("cashier");
      },
      align: "flex-start",
    },
    {
      width: { xl: "100%" },
      text: "Ingredients",
      Icon: TomatoSVG,
      state: location.pathname.split("/")[2] === "ingredients",
      handler: () => {
        navigate("ingredients");
      },
      align: "flex-start",
    },
    {
      width: { xl: "100%" },
      text: "Categories",
      Icon: CategorySVG,
      state: location.pathname.split("/")[2] === "menuCategory",
      handler: () => {
        navigate("menuCategory");
      },
      align: "flex-start",
    },
  ];

  return (
    <Stack height={"100vh"} direction={{ xl: "row", xs: "column" }}>
      <NavBar Buttons={navBtns} setUserData={setUser} />

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
