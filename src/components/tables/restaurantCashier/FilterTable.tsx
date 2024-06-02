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
    marginLeft: "13px",
    marginBottom: "26px",
  };
  return (
    <>
      <Stack>
        <Box
          sx={{
            width: "300px",
            height: "600px",
            backgroundColor: "#E8DCCC",
            borderRadius: "15px",
            padding: "24px 32px",
          }}
        >
          <MainButton
            text={"Filter"}
            Icon={FilterSVG}
            state={true}
            width={"100px"}
          />

          <Box marginTop={"40px"}>
            <Typography sx={titleStyle}>Status</Typography>
            <StatusFilter />
          </Box>
          <Box marginTop={"40px"}>
            <Typography sx={titleStyle}>Date</Typography>
            <DateFilter label="From" />
            <DateFilter label="To" />
          </Box>
        </Box>
      </Stack>
    </>
  );
}
