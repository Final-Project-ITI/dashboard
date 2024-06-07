import { Box, Stack, Typography } from "@mui/material";
import icon from "../../assets/logo.svg";
import MainButton from "../shared/MainButton";

import PhoneSVG from "../../assets/svgs/PhoneSVG";
import FilterTable from "../tables/restaurantCashier/FilterTable";
import OrdersTable from "../tables/restaurantCashier/OrdersTable";

export default function RestaurantCashier() {
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
            User Name
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#0A0A0A80",
              marginBottom: "80px",
            }}
          >
            Restaurant Name
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
        <OrdersTable />
        <FilterTable />
      </Stack>
    </Stack>
  );
}
