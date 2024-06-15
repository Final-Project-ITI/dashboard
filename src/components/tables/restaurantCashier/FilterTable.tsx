import { Box, Stack, Typography } from "@mui/material";
import MainButton from "../../shared/MainButton";
import FilterSVG from "../../../assets/svgs/FilterSVG";
import StatusFilter from "./filterComponents/StatusFilter";
import DateFilter from "./filterComponents/DateFilter";
import { IOrder } from "../../../models/order.model";
import { useEffect, useState } from "react";

export default function FilterTable({
  data,
  setData,
  orders,
  setOrders,
  orderStatuses,
  currentPage,
  setCurrentPage,
  handlePagination,
  setStartDate,
  setEndDate,
}: any) {
  const titleStyle = {
    color: "#0A0A0A80",
    fontWeight: "bold",
    fontSize: "28px",
    marginLeft: { xl: "13px", md: 0 },
    marginBottom: "26px",
  };
  const [copiedData, setCopiedData] = useState<IOrder[]>([]);
  const handleFilterStatus = (statusId: string) => {
    if (!statusId) {
      setData((pre: any) => ({ orders: [...copiedData], items: pre.items }));
    } else {
      setData((pre: any) => ({
        orders: copiedData.filter(
          (order: IOrder) => order.statusId._id === statusId
        ),
        items: pre.items,
      }));
    }

    setOrders(data.orders.slice(0, 5));
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!copiedData.length) {
      setCopiedData([...data.orders]);
    }
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
              visibility: "hidden",
            }}
          >
            Cashier
          </Typography>
        </Stack>

        <Stack
          sx={{
            width: { xl: "250px", md: "850px", xs: "450px" },
            height: { xl: "600px", md: "100%" },
            backgroundColor: "#E8DCCC",
            borderRadius: "15px",
            padding: "24px 32px",
          }}
          direction={{ xl: "column", md: "row" }}
          justifyContent={{ xl: "flex-start", md: "space-between" }}
        >
          <MainButton
            text={"Filter"}
            Icon={FilterSVG}
            state={true}
            width={"100px"}
          />

          <Box marginTop={{ xl: "40px", md: 0 }}>
            <Typography sx={titleStyle}>Status</Typography>
            <StatusFilter
              orderStatuses={orderStatuses}
              handleFilterStatus={handleFilterStatus}
            />
          </Box>
          <Box marginTop={{ xl: "40px", md: 0 }}>
            <Typography sx={titleStyle}>Date</Typography>
            <Stack direction={{ xl: "column", md: "row" }} spacing={"10px"}>
              <DateFilter label="From" setDate={setStartDate} />
              <DateFilter label="To" setDate={setEndDate} />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
