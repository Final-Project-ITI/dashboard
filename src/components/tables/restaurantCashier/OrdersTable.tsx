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

/* -------- */
import { useEffect, useState } from "react";

/* -------- */
import { IItem } from "../../../models/item.model";
import { IOrder } from "../../../models/order.model";

/* -------- */
import DetailsSVG from "../../../assets/svgs/DetailsSVG";
import OrderDetailsPopup from "../../popups/restaurnatCashier/OrderDetailsPopup";
import StatusDropDown from "../../shared/StatusDropDown";

import Pagination from "../../shared/Pagination";

export default function OrdersTable({
  data,
  orders,
  setOrders,
  orderStatuses,
  currentPage,
  setCurrentPage,
  handlePagination,
}: any) {
  const [orderDetailsTrigger, setOrderDetailsTrigger] = useState(false);
  const [order, setOrder] = useState<IOrder>();
  const [items, setItems] = useState<IItem[]>([]);

  const handleTotalPrice = (orderId: string) => {
    const filteredItems = items.filter((item) => item.orderId === orderId);
    let totalPrice = 0;

    filteredItems.forEach((ele) => {
      totalPrice += ele.productId.price * ele.quantity;
    });

    return totalPrice;
  };

  const handleDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    setCurrentPage(1);
    setOrders(data?.orders.slice(0, 5));
    setItems(data?.items);
  }, [data]);

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
            order={order}
            items={items}
            handleTotalPrice={handleTotalPrice}
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
                  {orders.length
                    ? orders.map((order: IOrder) => (
                        <TableRow>
                          <TableCell sx={tableBodyTextStyle}>
                            {order.userId.fullName}
                          </TableCell>
                          <TableCell
                            sx={{ ...tableHeadTextStyle, ...hideContent }}
                          >
                            {handleDate(order.createdAt).split("/").join("-")}
                          </TableCell>
                          <TableCell
                            sx={{ ...tableHeadTextStyle, ...hideContent }}
                          >
                            EGP {handleTotalPrice(order._id)}
                          </TableCell>
                          <TableCell sx={tableBodyTextStyle}>
                            <IconButton
                              onClick={() => {
                                setOrder(order);
                                setOrderDetailsTrigger(true);
                              }}
                            >
                              <DetailsSVG />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={tableBodyTextStyle}>
                            <StatusDropDown
                              orderStatuses={orderStatuses}
                              order={order}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : ""}
                </TableBody>
              </Table>

              <Pagination
                handler={handlePagination}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={4}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
