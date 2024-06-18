import { Stack } from "@mui/material";

/* -------- */
import { useEffect, useState } from "react";
import useFilteredOrders from "../../hooks/api/restaurantCashier/useFilteredOrders";
import useOrderStatueses from "../../hooks/api/restaurantCashier/useOrderStatueses";
import useOrders from "../../hooks/api/restaurantCashier/useOrders";

/* -------- */
import { IMainButton } from "../../models/mainButton.model";
import { IOrder } from "../../models/order.model";

/* -------- */
import PhoneSVG from "../../assets/svgs/PhoneSVG";
import NavBar from "../shared/NavBar";
import FilterTable from "../tables/restaurantCashier/FilterTable";
import OrdersTable from "../tables/restaurantCashier/OrdersTable";

export default function RestaurantCashier() {
  const [data, setData, isLoading, setIsLoading, error, setError] = useOrders();
  const [orderStatuses] = useOrderStatueses();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useFilteredOrders({ startDate, endDate, setData, setIsLoading, setError });

  const navBtns: IMainButton[] = [
    { text: "Cashier", Icon: PhoneSVG, state: true, width: "100%" },
  ];

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
          isLoading={isLoading}
          error={error}
        />
        <FilterTable
          data={data}
          setData={setData}
          setOrders={setOrders}
          orderStatuses={orderStatuses}
          setCurrentPage={setCurrentPage}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Stack>
    </Stack>
  );
}
