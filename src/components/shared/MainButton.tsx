import { Button, Typography } from "@mui/material";

export default function MainButton({ width, Icon, text, handler, state }: any) {
  const style = {
    width,
    padding: "8.5px 0",
    textAlign: "center",
    color: state ? "white" : "#0A0A0A80",
    backgroundColor: state ? "#d84339" : "none",
    "&:hover": {
      backgroundColor: "#d84339",
      color: "white",
    },
    alignSelf: "flex-start",
  };

  return (
    <Button sx={style} onClick={handler}>
      {Icon ? <Icon color={state ? "white" : "#0A0A0A80"} /> : ""}
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          marginLeft: Icon ? "8px" : "0",
        }}
      >
        {text}
      </Typography>
    </Button>
  );
}
