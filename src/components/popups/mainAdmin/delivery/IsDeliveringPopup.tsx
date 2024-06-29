import {
  Box,
  Button,
  Stack,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

/* -------- */
import { useEffect, useState } from "react";

/* -------- */
import "react-toastify/dist/ReactToastify.css";
import useDeliveryHistory from "../../../../hooks/api/mainAdmin/useDeliveryHistory";
import { IDelivery } from "../../../../models/delivery.model";
import Pagination from "../../../shared/Pagination";

/* -------- */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useIsDelivering from "../../../../hooks/api/mainAdmin/useIsDelivering";

export default function IsDeliveringPopup({
  trigger,
  setTrigger,
  id,
  setId,
}: any) {
  const [data, setData, isLoading, error] = useIsDelivering(id);
  const [deliveryHistory, setDeliveryHistory] = useState<IDelivery[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skeletonRows = [0, 0];

  useEffect(() => {
    if (data) {
      console.log(data);

      setDeliveryHistory(data.slice(0, 6));
    }
  }, [data]);
  const tableHeadTextStyle = {
    textAlign: "center",
    color: "#0A0A0A80",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "none",
    textTransform: "capitalize",
  };

  const tableBodyTextStyle = {
    textAlign: "center",
    fontSize: "18px",
    borderBottom: "none",
  };

  const hideContent = {
    display: { md: "table-cell", xs: "none" },
  };
  return (
    <>
      {trigger ? (
        <Stack
          position={"fixed"}
          top={"0"}
          left={"0"}
          width={"100vw"}
          height={"100vh"}
          zIndex={1}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            sx={{
              width: { xl: "1000px", md: "850px", xs: "450px" },
              height: "600px",
              backgroundColor: "#F3ECE4",
              borderRadius: "15px",
              padding: "12px ",
              position: "relative",
            }}
          >
            <Box
              onClick={() => {
                setTrigger(false);
                setId("");
              }}
              sx={{
                position: "absolute",
                right: "20px",
                top: "20px",
                "&:hover": { cursor: "pointer" },
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.10645 12.8917L12.8931 1.1084M1.10645 1.1084L12.8931 12.8917"
                  stroke="#E4002B"
                  stroke-opacity="0.38"
                  stroke-width="1.875"
                  stroke-linecap="round"
                />
              </svg>
            </Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "30px",
                marginLeft: "40px",
              }}
            >
              Is Delivering
            </Typography>

            <Stack
              justifyContent={"space-between"}
              height={"85%"}
              sx={{ paddingInline: "12px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeadTextStyle}>restaurant</TableCell>

                    <TableCell
                      sx={{
                        ...tableHeadTextStyle,
                        ...hideContent,
                      }}
                    >
                      address
                    </TableCell>
                    <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                      restaurant phone
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {isLoading
                    ? ""
                    : deliveryHistory.map((delivery) => {
                        return (
                          <TableRow key={delivery._id}>
                            <TableCell
                              sx={{
                                ...tableBodyTextStyle,
                              }}
                            >
                              {delivery.restaurant.name}
                            </TableCell>
                            <TableCell
                              sx={{
                                ...tableBodyTextStyle,
                                ...hideContent,
                                width: "200px",
                              }}
                            >
                              {delivery.restaurant.address}
                            </TableCell>
                            <TableCell
                              sx={{
                                ...tableBodyTextStyle,
                                ...hideContent,
                              }}
                            >
                              {delivery.restaurant.phone}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                      client name
                    </TableCell>
                    <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                      client address
                    </TableCell>
                    <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                      client phone
                    </TableCell>
                    <TableCell sx={tableHeadTextStyle}>total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody
                  sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  {isLoading ? (
                    <SkeletonTheme
                      baseColor="transparent"
                      highlightColor="#0A0A0A80"
                    >
                      {skeletonRows.map((e, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
                            <Skeleton height={50} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </SkeletonTheme>
                  ) : (
                    deliveryHistory.map((delivery) => {
                      return (
                        <TableRow key={delivery._id}>
                          <TableCell
                            sx={{
                              ...tableBodyTextStyle,
                              ...hideContent,
                            }}
                          >
                            {delivery.orderId.userId.fullName}
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableBodyTextStyle,
                              ...hideContent,
                              width: "200px",
                            }}
                          >
                            {delivery.orderId.addressId.details}
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableBodyTextStyle,
                              ...hideContent,
                            }}
                          >
                            {delivery.orderId.phoneId.phoneNumber}
                          </TableCell>
                          <TableCell sx={tableBodyTextStyle}>
                            EGP{delivery.total}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>

              {deliveryHistory.length > 6 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageSize={6}
                  data={data}
                  setItems={setDeliveryHistory}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
