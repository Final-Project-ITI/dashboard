import { Box, Button, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

/* -------- */
import { MouseEvent, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

/* -------- */
import { IOrderStatus } from "../../models/orderStatus.model";
import { IOrder } from "../../models/order.model";
import { GET_ORDERS_URL } from "../../utils/urls";

/* -------- */
import ArrowDown from "../../assets/svgs/ArrowDown";

export default function StatusDropDown({
  orderStatuses,
  order,
}: {
  orderStatuses: IOrderStatus[];
  order: IOrder;
}) {
  const [currentOption, setCurrentOption] = useState<IOrderStatus>({
    _id: "",
    status: "",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const axiosPrivate = useAxiosPrivate();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (option: IOrderStatus) => {
    setAnchorEl(null);
    handleUpdateOrderStatus(option._id);
    setCurrentOption(option);
  };

  const handleUpdateOrderStatus = async (statusId: string) => {
    await axiosPrivate.patch(GET_ORDERS_URL + "/" + order._id, {
      statusId,
    });
  };

  useEffect(() => {
    setCurrentOption(order.statusId);
  }, [order]);

  return (
    <Box>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography
          sx={{
            fontSize: "16px",
            textTransform: "capitalize",
            color: "black",
          }}
        >
          {currentOption?.status}
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
        {orderStatuses.map((orderStatus) => (
          <MenuItem
            key={orderStatus.status}
            selected={orderStatus.status === currentOption.status}
            onClick={() => handleClose(orderStatus)}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
              }}
            >
              {orderStatus.status}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
