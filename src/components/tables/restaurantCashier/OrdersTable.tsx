import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
import Table from "@mui/material/Table";
import { useState } from "react";

import DetailsSVG from "../../../assets/svgs/DetailsSVG";
import OrderDetailsPopup from "../../popups/restaurnatCashier/OrderDetailsPopup";
import StatusDropDown from "../../shared/StatusDropDown";

export default function OrdersTable() {
  const [orderDetailsTrigger, setOrderDetailsTrigger] = useState(false);

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

  const hideContent = {
    display: { md: "table-cell", xs: "none" },
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
            }}
          >
            Cashier
          </Typography>
        </Stack>

        <Stack>
          <OrderDetailsPopup
            trigger={orderDetailsTrigger}
            setTrigger={setOrderDetailsTrigger}
          />
          <Box
            sx={{
              width: { xl: "950px", md: "850px", xs: "450px" },
              height: "600px",
              backgroundColor: "#E8DCCC",
              borderRadius: "15px",
            }}
            marginBottom={{ xl: 0, md: "20px", xs: "30px" }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "30px",
                marginLeft: "40px",
              }}
            >
              Cashier
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableCell sx={tableHeadTextStyle}>User Name</TableCell>
                  <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                    Total
                  </TableCell>
                  <TableCell sx={tableHeadTextStyle}>Order Details</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Status</TableCell>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell sx={tableBodyTextStyle}>
                      Waleed Almenawy
                    </TableCell>
                    <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                      25-05-2024
                    </TableCell>
                    <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                      EGP 400
                    </TableCell>
                    <TableCell sx={tableBodyTextStyle}>
                      <IconButton
                        onClick={() => {
                          setOrderDetailsTrigger(true);
                        }}
                      >
                        <DetailsSVG />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={tableBodyTextStyle}>
                      <StatusDropDown />
                    </TableCell>
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
      </Stack>
    </>
  );
}
