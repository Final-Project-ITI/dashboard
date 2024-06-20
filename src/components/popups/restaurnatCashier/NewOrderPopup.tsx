import { Box, Button, Stack, Typography } from "@mui/material";

export default function NewOrderPopup({
  trigger,
  setTrigger,
  newOrders,
  setNewOrders,
  setRefreshOrders,
}: any) {
  const handleOnClick = () => {
    setTrigger(false);
    setNewOrders(0);
    setRefreshOrders((pre: boolean) => !pre);
  };

  return (
    <>
      {trigger ? (
        <Stack
          position={"fixed"}
          width={"100vw"}
          height={"100vh"}
          top={0}
          left={0}
          zIndex={1}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            sx={{
              backgroundColor: "#F3ECE4",
              borderRadius: "25px",
              padding: "16px 28px 24px 28px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "center",
                color: "#D74339",
              }}
            >
              New Orders
            </Typography>

            <Typography>
              {"You have " +
                (newOrders === 1 ? "a new order" : newOrders + " new orders")}
            </Typography>

            <Stack
              marginTop={"24px"}
              spacing={"40px"}
              width={"100%"}
              justifyContent={"center"}
              direction={"row"}
            >
              <Button
                onClick={handleOnClick}
                variant={"contained"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Ok{" "}
              </Button>
            </Stack>
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
