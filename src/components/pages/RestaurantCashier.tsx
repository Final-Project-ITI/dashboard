import { Stack } from "@mui/material";

/* -------- */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

/* -------- */
import { IItem } from "../../models/item.model";
import { IOrder } from "../../models/order.model";
import { IOrderStatus } from "../../models/orderStatus.model";
import { GET_ORDERS_URL, GET_ORDER_STATUESES } from "../../utils/urls";

/* -------- */
import PhoneSVG from "../../assets/svgs/PhoneSVG";
import MainButton from "../shared/MainButton";
import NavBar from "../shared/NavBar";
import FilterTable from "../tables/restaurantCashier/FilterTable";
import OrdersTable from "../tables/restaurantCashier/OrdersTable";

export default function RestaurantCashier() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth }: any = useAuth();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();
  const [data, setData] = useState<{ orders: IOrder[]; items: IItem[] }>({
    orders: [],
    items: [],
  });
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<IOrderStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navBtns = [
    <MainButton
      width={"100%"}
      text={"cashier"}
      Icon={PhoneSVG}
      state={true}
    ></MainButton>,
  ];

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

  useEffect(() => {
    handleGetOrders();
    handleGetOrderStatueses();
  }, []);

  useEffect(() => {
    handleGetFilteredOrdersByDate();
  }, [startDate, endDate]);

  return (
    <Stack height={"100vh"} direction={{ xl: "row", xs: "column" }}>
      <NavBar Buttons={navBtns} />

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
