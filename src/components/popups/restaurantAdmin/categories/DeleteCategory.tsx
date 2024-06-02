import { Box, Button, Stack, Typography } from "@mui/material";

export default function DeleteCategoryPopup({ trigger, setTrigger }: any) {
  const handleDelete = () => {
    console.log("delete");
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

            <Typography>
              Are you sure you want to delete this Category?
            </Typography>

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