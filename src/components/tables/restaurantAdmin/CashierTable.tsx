import {
  Box,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";

/* -------- */
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

/* -------- */
import { IUser } from "../../../models/user.model";
import { RESTAURANTS_CAHSIERS_URL } from "../../../utils/urls";

/* -------- */
import AddIcon from "@mui/icons-material/Add";
import AddCashier from "../../popups/restaurantAdmin/cashier/AddCashier";
import MainButton from "../../shared/MainButton";
import Pagination from "../../shared/Pagination";

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

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={4}
                data={data}
                setItems={setCashiers}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
