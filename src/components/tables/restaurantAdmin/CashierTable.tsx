import { useState } from "react";
import Table from "@mui/material/Table";
import {
  Box,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";

import MainButton from "../../shared/MainButton";
import AddCashier from "../../popups/restaurantAdmin/cashier/AddCashier";

export default function CashierTable() {
  const [addCashierTrigger, setAddCashierTrigger] = useState(false);

  const tableHeadTextStyle = {
    textAlign: "center",
    color: "#0A0A0A80",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "none",
  };

  const tableBodyTextStyle = {
    textAlign: "center",
    fontSize: "16px",
    borderBottom: "none",
  };

  return (
    <>
      <Stack
        position={"absolute"}
        width={"56%"}
        top={"4%"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Cashier
        </Typography>

        <MainButton
          width={"156px"}
          text={"Add Cashier"}
          Icon={AddIcon}
          handler={() => {
            setAddCashierTrigger(true);
          }}
          state={true}
        ></MainButton>
      </Stack>

      <Stack>
        <AddCashier
          trigger={addCashierTrigger}
          setTrigger={setAddCashierTrigger}
        />

        <Box
          sx={{
            width: "1000px",
            height: "600px",
            backgroundColor: "#E8DCCC",
            borderRadius: "15px",
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              marginTop: "30px",
              marginLeft: "40px",
            }}
          >
            Cashiers
          </Typography>

          <Stack justifyContent={"space-between"} height={"85%"}>
            <Table>
              <TableHead>
                <TableCell sx={tableHeadTextStyle}>Cashier Name</TableCell>
                <TableCell sx={tableHeadTextStyle}>E-Mail</TableCell>
                <TableCell sx={tableHeadTextStyle}>Password</TableCell>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell sx={tableBodyTextStyle}>Waleed Almenawy</TableCell>
                  <TableCell sx={tableBodyTextStyle}>
                    waleed.almenawy@outlook.com
                  </TableCell>
                  <TableCell sx={tableBodyTextStyle}>123123</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Stack width={"100%"} justifyContent={"center"} direction={"row"}>
              <Stack
                width={"120px"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <IconButton>
                  <ArrowBackIosNewIcon
                    fontSize="small"
                    sx={{
                      color: "black",
                    }}
                  />
                </IconButton>
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: "black",
                    border: "solid 2px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "2px",
                    fontWeight: "bold",
                  }}
                >
                  1
                </Box>
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: "#E4002B",
                    border: "solid 2px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "2px",
                    fontWeight: "bold",
                  }}
                >
                  2
                </Box>
                <IconButton>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
