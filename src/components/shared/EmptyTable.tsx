import { Stack, Typography } from "@mui/material";

export default function EmptyTable({ message }: any) {
  return (
    <Stack
      position={"absolute"}
      justifyContent={"center"}
      alignItems={"center"}
      top={"25%"}
      sx={{
        width: { xl: "1000px", md: "850px", xs: "450px" },
        height: "600px",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "gray",
        }}
      >
        {message}
      </Typography>
    </Stack>
  );
}
