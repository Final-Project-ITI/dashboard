import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

/* -------- */
import { useEffect, useState } from "react";

/* -------- */
import { IItem } from "../../../models/item.model";
import { IOrder } from "../../../models/order.model";

/* -------- */
import ExitSVG from "../../../assets/svgs/ExitSVG";

export default function OrderDetailsPopup({
  trigger,
  setTrigger,
  order,
  items,
  handleTotalPrice,
}: {
  order: IOrder;
  items: IItem[];
  trigger: any;
  setTrigger: any;
  handleTotalPrice: any;
}) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<IItem[]>([]);

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
  };

  const tableHeaderStyle = {
    fontSize: "20px",
    color: "#D7433980",
    textAlign: "center",
  };

  useEffect(() => {
    setOrderItems(items.filter((item) => item.orderId === order._id));
    setTotalPrice(handleTotalPrice(order?._id));
  }, [order]);

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
            width={{ xl: "35%", md: "55%", xs: "85%" }}
            sx={{
              backgroundColor: "#F3ECE4",
              borderRadius: "15px",
            }}
          >
            <Box>
              <IconButton
                onClick={() => {
                  setTrigger(false);
                }}
              >
                <ExitSVG></ExitSVG>
              </IconButton>
            </Box>
            <Stack
              sx={{
                padding: "0 16px",
              }}
            >
              <Typography sx={headerStyle}>User Info</Typography>
              <Stack spacing={"8px"} padding={"0 0 10px 52px"}>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  alignItems={"flex-end"}
                >
                  <Typography sx={tableHeaderStyle}>Name:</Typography>
                  <Typography>{order.userId.fullName}</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  alignItems={"flex-end"}
                >
                  <Typography sx={tableHeaderStyle}>E-Mail:</Typography>
                  <Typography>{order.userId.email}</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  alignItems={"flex-end"}
                >
                  <Typography sx={tableHeaderStyle}>Phone:</Typography>
                  <Typography>{order.phoneId.phoneNumber}</Typography>
                </Stack>
              </Stack>
              <Typography sx={headerStyle}>Order Details</Typography>
              <Stack justifyContent={"space-between"} height={"85%"}>
                <TableContainer
                  sx={{
                    maxHeight: "300px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <Table stickyHeader>
                    <TableHead
                      sx={{
                        backgroundColor: "#F3ECE4",
                      }}
                    >
                      <TableCell
                        sx={{ ...tableHeaderStyle, textAlign: "flex-start" }}
                      >
                        Item
                      </TableCell>
                      <TableCell sx={tableHeaderStyle}>Qty</TableCell>
                      <TableCell sx={tableHeaderStyle}>Price</TableCell>
                      <TableCell sx={tableHeaderStyle}>Total</TableCell>
                    </TableHead>

                    <TableBody>
                      {orderItems.length
                        ? orderItems.map((item) => (
                            <TableRow>
                              <TableCell>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  spacing={"30px"}
                                >
                                  <img
                                    src={item.productId.icon}
                                    title="icon"
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: "50px",
                                      width: "60px",
                                      height: "60px",
                                    }}
                                  />
                                  <Typography>
                                    {item.productId.title}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell>
                                <Typography textAlign={"center"}>
                                  {item.quantity}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography textAlign={"center"}>
                                  EGP {item.productId.price}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography textAlign={"center"}>
                                  EGP {item.quantity * item.productId.price}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))
                        : ""}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  padding={"30px"}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography>EGP {totalPrice}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
