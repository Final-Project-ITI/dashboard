import { Box, Stack, Typography } from "@mui/material";
import icon from "../../assets/logo.svg";
import MainButton from "../shared/MainButton";

import PhoneSVG from "../../assets/svgs/PhoneSVG";
import FilterTable from "../tables/restaurantCashier/FilterTable";
import OrdersTable from "../tables/restaurantCashier/OrdersTable";
import { useEffect, useState } from "react";
import { IOrder } from "../../models/order.model";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IOrderStatus } from "../../models/orderStatus.model";
import {
  GET_ORDERS_URL,
  GET_ORDER_STATUESES,
  USER_URL,
} from "../../utils/URLs";
import { IItem } from "../../models/item.model";
import { IUser } from "../../models/user.model";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function RestaurantCashier() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth }: any = useAuth();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();
  const [cashier, setCashier] = useState<IUser>();
  const [data, setData] = useState<{ orders: IOrder[]; items: IItem[] }>({
    orders: [],
    items: [],
  });
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGetCashierData = async () => {
    try {
      const { data } = await axiosPrivate.get(USER_URL);
      setCashier(data);
    } catch (e) {}
  };

  const handleGetOrders = async () => {
    try {
      const res = await axiosPrivate.get(GET_ORDERS_URL);
      setData(res.data);
    } catch (e) {}
  };

  const handleGetFilteredOrdersByDate = async () => {
    try {
      const res = await axiosPrivate.get(
        GET_ORDERS_URL +
          "/filter?startDate=" +
          startDate +
          "&endDate=" +
          endDate
      );
      setData(res.data);
    } catch (e) {}
  };

  const handleGetOrderStatueses = async () => {
    try {
      const res = await axiosPrivate.get(GET_ORDER_STATUESES);
      setOrderStatuses(res.data);
    } catch (e) {}
  };

  const handlePagination = async (direction: number) => {
    const pageSize = 5;
    let page = currentPage;

    if (direction && currentPage == Math.ceil(data.orders.length / pageSize))
      return;
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

    setOrders(data.orders.slice(startIndex, endIndex));
  };

  const handleLogout = () => {
    setAuth({
      token: "",
    });
    removeCookie("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    handleGetCashierData();
    handleGetOrders();
    handleGetOrderStatueses();
  }, []);

  useEffect(() => {
    handleGetFilteredOrdersByDate();
  }, [startDate, endDate]);

  return (
    <Stack height={"100vh"} direction={{ xl: "row", xs: "column" }}>
      <Stack
        sx={{
          backgroundColor: "#E8DCCC",
          width: { xl: "18%", md: "100%" },
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            marginTop: "80px",
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {cashier?.fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#0A0A0A80",
              marginBottom: "80px",
            }}
          >
            {cashier?.restaurantId?.name}
          </Typography>

          <Stack>
            <Stack
              spacing={"16px"}
              sx={{
                marginBottom: { xl: "50%", xs: "10%" },
              }}
            >
              <MainButton
                width={"100%"}
                text={"cashier"}
                Icon={PhoneSVG}
                state={true}
              ></MainButton>
            </Stack>

            <Stack spacing={"32px"} alignItems={"center"}>
              <MainButton
                width={"100%"}
                text={"Log Out"}
                state={true}
                handler={handleLogout}
              ></MainButton>

              <img
                src={icon}
                title="logo"
                style={{
                  objectFit: "cover",
                  width: "80px",
                  height: "80px",
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          backgroundColor: "#F3ECE4",
          width: { xl: "85%", md: "100%" },
        }}
        spacing={"24px"}
        direction={{ xl: "row", xs: "column" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <OrdersTable
          data={data}
          orders={orders}
          setOrders={setOrders}
          orderStatuses={orderStatuses}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handlePagination={handlePagination}
        />
        <FilterTable
          data={data}
          setData={setData}
          orders={orders}
          setOrders={setOrders}
          orderStatuses={orderStatuses}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handlePagination={handlePagination}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Stack>
    </Stack>
  );
}
