import { Box, Stack, Typography } from "@mui/material";
import MainButton from "../../shared/MainButton";
import FilterSVG from "../../../assets/svgs/FilterSVG";
import StatusFilter from "./filterComponents/StatusFilter";
import DateFilter from "./filterComponents/DateFilter";

export default function FilterTable() {
  const titleStyle = {
    color: "#0A0A0A80",
    fontWeight: "bold",
    fontSize: "28px",
    marginLeft: { xl: "13px", md: 0 },
    marginBottom: "26px",
  };
  return (
    <>
      <Stack
        height={"100%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          marginBlock={"10px"}
          justifyContent={"space-between"}
          width={"85%"}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              visibility: "hidden",
            }}
          >
            Cashier
          </Typography>
        </Stack>

        <Stack
          sx={{
            width: { xl: "250px", md: "850px", xs: "450px" },
            height: { xl: "600px", md: "100%" },
            backgroundColor: "#E8DCCC",
            borderRadius: "15px",
            padding: "24px 32px",
          }}
          direction={{ xl: "column", md: "row" }}
          justifyContent={{ xl: "flex-start", md: "space-between" }}
        >
          <MainButton
            text={"Filter"}
            Icon={FilterSVG}
            state={true}
            width={"100px"}
          />

          <Box marginTop={{ xl: "40px", md: 0 }}>
            <Typography sx={titleStyle}>Status</Typography>
            <StatusFilter />
          </Box>
          <Box marginTop={{ xl: "40px", md: 0 }}>
            <Typography sx={titleStyle}>Date</Typography>
            <Stack direction={{ xl: "column", md: "row" }} spacing={"10px"}>
              <DateFilter label="From" />
              <DateFilter label="To" />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
