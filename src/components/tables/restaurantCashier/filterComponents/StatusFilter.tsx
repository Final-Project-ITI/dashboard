import { Box, Button, Typography } from "@mui/material";

/* -------- */
import * as React from "react";

/* -------- */
import { IOrderStatus } from "../../../../models/orderStatus.model";

/* -------- */
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDown from "../../../../assets/svgs/ArrowDown";

export default function StatusFilter({
  orderStatuses,
  handleFilterStatus,
}: {
  orderStatuses: IOrderStatus[];
  handleFilterStatus: any;
}) {
  const [currentOption, setCurrentOption] = React.useState<IOrderStatus>({
    _id: "",
    status: "None",
  });
  const [options, setOptions] = React.useState<IOrderStatus[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: IOrderStatus) => {
    setAnchorEl(null);
    handleFilterStatus(option._id);
    setCurrentOption(option);
  };

  React.useEffect(() => {
    setOptions([
      {
        _id: "",
        status: "None",
      },
      ...orderStatuses,
    ]);
  }, [orderStatuses]);

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
          {currentOption.status}
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
            key={option.status}
            selected={option.status === currentOption.status}
            onClick={() => handleClose(option)}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
              }}
            >
              {option.status}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
