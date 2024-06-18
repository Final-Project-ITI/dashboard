/* -------- */
import { Stack } from "@mui/material";

/* -------- */
import PersonSVG from "../../assets/svgs/PersonSVG";
import NavBar from "../shared/NavBar";
import RestaurantsTable from "../tables/mainAdmin/RestaurantsTable";
import { IMainButton } from "../../models/mainButton.model";

export default function MainAdmin() {
  const navBtns: IMainButton[] = [
    { text: "Restaurants", Icon: PersonSVG, state: true, width: "100%" },
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
        <RestaurantsTable />
      </Stack>
    </Stack>
  );
}
