/* -------- */
import { Stack } from "@mui/material";

/* -------- */
import { Outlet, useNavigate } from "react-router-dom";

/* -------- */
import CategorySVG from "../../assets/svgs/CategorySVG";
import MenuSVG from "../../assets/svgs/MenuSVG";
import PersonSVG from "../../assets/svgs/PersonSVG";
import TomatoSVG from "../../assets/svgs/TomatoSVG";
import MainButton from "../shared/MainButton";
import NavBar from "../shared/NavBar";

export default function RestaurantAdmin({ setUser }: any) {
  const navigate = useNavigate();

  const navBtns = [
    <MainButton
      width={{ xl: "100%" }}
      text={"Menu"}
      Icon={MenuSVG}
      handler={() => {
        navigate("menu");
      }}
      state={location.pathname.split("/")[2] === "menu"}
    ></MainButton>,
    <MainButton
      width={{ xl: "100%" }}
      text={"Cashier"}
      Icon={PersonSVG}
      handler={() => {
        navigate("cashier");
      }}
      state={location.pathname.split("/")[2] === "cashier"}
    ></MainButton>,
    <MainButton
      width={{ xl: "100%" }}
      text={"Ingredients"}
      Icon={TomatoSVG}
      handler={() => {
        navigate("ingredients");
      }}
      state={location.pathname.split("/")[2] === "ingredients"}
    ></MainButton>,
    <MainButton
      width={{ xl: "100%" }}
      text={"Categories"}
      Icon={CategorySVG}
      handler={() => {
        navigate("category");
      }}
      state={location.pathname.split("/")[2] === "category"}
    ></MainButton>,
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
