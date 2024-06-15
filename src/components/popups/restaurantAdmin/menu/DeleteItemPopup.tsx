import { Box, Button, Stack, Typography } from "@mui/material";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { CREATE_PRODUCT_URL } from "../../../../utils/URLs";

export default function DeleteItemPopup({
  trigger,
  setTrigger,
  menuItem,
}: any) {
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async () => {
    const res = await axiosPrivate.delete(
      CREATE_PRODUCT_URL + "/" + menuItem._id
    );

    setTrigger(false);
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
              Warning
            </Typography>

            <Typography>Are you sure you want to delete this Item?</Typography>

            <Stack
              marginTop={"24px"}
              spacing={"40px"}
              width={"100%"}
              justifyContent={"center"}
              direction={"row"}
            >
              <Button
                onClick={handleDelete}
                variant={"outlined"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Yes{" "}
              </Button>

              <Button
                onClick={() => {
                  setTrigger(false);
                }}
                variant={"contained"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Cancel{" "}
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
