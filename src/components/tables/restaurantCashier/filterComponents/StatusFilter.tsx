import { Box, Button, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import ArrowDown from "../../../../assets/svgs/ArrowDown";

const options = [
  "placed",
  "confirmed",
  "being prepared",
  "ready for pickup",
  "cancelled",
];

export default function StatusFilter() {
  const [currentOption, setCurrentOption] = React.useState("placed");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: string) => {
    setAnchorEl(null);
    setCurrentOption(option);
  };

  return (
    <Box>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          justifyContent: "space-between",
          borderRadius: "10px",
          border: "solid 1px #D74339",
          backgroundColor: "#F3ECE4",
        }}
        fullWidth
      >
        <Typography
          sx={{
            fontSize: "16px",
            textTransform: "capitalize",
            color: "black",
          }}
        >
          {currentOption}
        </Typography>
        <ArrowDown />
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(currentOption)}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === currentOption}
            onClick={() => handleClose(option)}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
              }}
            >
              {option}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
