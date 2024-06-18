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

/* -------- */
import { IUser } from "../../../models/user.model";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* -------- */
import AddIcon from "@mui/icons-material/Add";
import useCashiers from "../../../hooks/api/restaurantAdmin/cashiers/useCashiers";
import AddCashier from "../../popups/restaurantAdmin/cashier/AddCashier";
import MainButton from "../../shared/MainButton";
import Pagination from "../../shared/Pagination";

export default function CashierTable() {
  const [addCashierTrigger, setAddCashierTrigger] = useState(false);
  const [data, isLoading] = useCashiers();
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

  const skeletonRows = [0, 0, 0, 0, 0, 0, 0];

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
            width={"200px"}
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
                  <TableRow>
                    <TableCell sx={tableHeadTextStyle}>Cashier Name</TableCell>
                    <TableCell sx={tableHeadTextStyle}>E-Mail</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {isLoading ? (
                    <SkeletonTheme
                      baseColor="transparent"
                      highlightColor="#0A0A0A80"
                    >
                      {skeletonRows.map((e, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
                            <Skeleton height={20} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </SkeletonTheme>
                  ) : cashiers.length ? (
                    cashiers.map((cashier) => {
                      return (
                        <TableRow key={cashier._id}>
                          <TableCell sx={tableBodyTextStyle}>
                            {cashier.fullName}
                          </TableCell>
                          <TableCell sx={tableBodyTextStyle}>
                            {cashier.email}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={7}
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
