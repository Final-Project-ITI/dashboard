import { useEffect, useState } from "react";
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
import { IUser } from "../../../models/user.model";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { RESTAURANTS_CAHSIERS_URL } from "../../../utils/URLs";

export default function CashierTable() {
  const [addCashierTrigger, setAddCashierTrigger] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<IUser[]>([]);
  const [cashiers, setCashiers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleGetCashiers = async () => {
    try {
      const res = await axiosPrivate.get(RESTAURANTS_CAHSIERS_URL);
      setData(res.data);
    } catch (e) {}
  };

  const handlePagination = async (direction: number) => {
    const pageSize = 7;
    let page = currentPage;

    if (direction && currentPage == Math.ceil(data.length / pageSize)) return;
    if (!direction && currentPage == 1) return;

    setCurrentPage((pre) => {
      if (direction) {
        page++;
        return ++pre;
      } else {
        page--;
        return --pre;
      }
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setCashiers(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    handleGetCashiers();
  }, []);

  useEffect(() => {
    setCashiers(data.slice(0, 7));
  }, [data]);

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
              width: { xl: "1000px", md: "850px", xs: "450px" },
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
              Cashiers
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableCell sx={tableHeadTextStyle}>Cashier Name</TableCell>
                  <TableCell sx={tableHeadTextStyle}>E-Mail</TableCell>
                </TableHead>

                <TableBody>
                  {cashiers.length
                    ? cashiers.map((cashier) => {
                        return (
                          <TableRow>
                            <TableCell sx={tableBodyTextStyle}>
                              {cashier.fullName}
                            </TableCell>
                            <TableCell sx={tableBodyTextStyle}>
                              {cashier.email}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>

              <Stack width={"100%"} justifyContent={"center"} direction={"row"}>
                <Stack
                  width={"120px"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <IconButton onClick={() => handlePagination(0)}>
                    <ArrowBackIosNewIcon
                      fontSize="small"
                      sx={{
                        color: currentPage == 1 ? "" : "black",
                      }}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: currentPage == 1 ? "#E4002B" : "black",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {currentPage != 1 ? currentPage - 1 : 1}
                  </Box>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: currentPage == 1 ? "black" : "#E4002B",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {currentPage != 1 ? currentPage : 2}
                  </Box>
                  <IconButton onClick={() => handlePagination(1)}>
                    <ArrowForwardIosIcon
                      fontSize="small"
                      sx={{
                        color:
                          currentPage == Math.ceil(data.length / 7)
                            ? ""
                            : "black",
                      }}
                    />
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
