import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function MainButton({ width, Icon, text, handler }: any) {
  const [isActive, setIsActive] = useState(false);

  const activeStyle = {
    width,
    padding: "8.5px 0",
    textAlign: "center",
    color: "white",
    backgroundColor: "#d84339",
    "&:hover": {
      backgroundColor: "#d84339",
      color: "white",
    },
  };

  const deactiveStyle = {
    width,
    padding: "8.5px 0",
    textAlign: "center",
    color: "#0A0A0A80",
    "&:hover": {
      backgroundColor: "#d84339",
      color: "white",
    },
  };

  return (
    <Button sx={activeStyle} onClick={handler}>
      {Icon ? <Icon /> : ""}
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
