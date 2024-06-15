import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import {
  Box,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";

import MainButton from "../../shared/MainButton";
import AddRestaurantPopup from "../../popups/mainAdmin/AddRestaurantPopup";
import { IUser } from "../../../models/user.model";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { RESTAURANTS_ADMINS_URL } from "../../../utils/URLs";

export default function RestaurantsTable() {
  const [addRestaurantTrigger, setAddRestaurantTrigger] = useState(false);
  const [restaurants, setRestaurants] = useState<IUser[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleGetRestuarants = async (page = 1) => {
    try {
      const { data } = await axiosPrivate.get(RESTAURANTS_ADMINS_URL + page);
      setRestaurants(data);
    } catch (e) {}
  };

  const handlePagination = async (direction: number) => {
    if (!direction && currentPage == 1) return;

    const { data } = await axiosPrivate.get(
      `${RESTAURANTS_ADMINS_URL}${
        direction ? currentPage + 1 : currentPage - 1
      }`
    );

    if (data.length) {
      setCurrentPage((pre) => {
        if (direction) {
          return ++pre;
        } else {
          return --pre;
        }
      });

      setRestaurants(data);
    }
  };

  useEffect(() => {
    handleGetRestuarants();
  }, []);

  const tableHeadTextStyle = {
    textAlign: "center",
    color: "#0A0A0A80",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "none",
  };

  const tableBodyTextStyle = {
    textAlign: "center",
    fontSize: "16px",
    borderBottom: "none",
  };

  const hideContent = {
    display: { md: "table-cell", xs: "none" },
  };

  return (
    <>
      <Stack
        height={"100%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          marginBlock={"10px"}
          justifyContent={"space-between"}
          width={"85%"}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Admin
          </Typography>

          <MainButton
            width={"200px"}
            text={"Add Restaurant"}
            Icon={AddIcon}
            handler={() => {
              setAddRestaurantTrigger(true);
            }}
            state={true}
          ></MainButton>
        </Stack>

        <Stack>
          <AddRestaurantPopup
            trigger={addRestaurantTrigger}
            setTrigger={setAddRestaurantTrigger}
          />
          <Box
            sx={{
              width: { xl: "1000px", md: "850px", xs: "450px" },
              height: "600px",
              backgroundColor: "#E8DCCC",
              borderRadius: "15px",
            }}
            marginBottom={{ xl: 0, md: "20px", xs: "30px" }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "30px",
                marginLeft: "40px",
              }}
            >
              Restaurants
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableCell sx={tableHeadTextStyle}>Restaurant Name</TableCell>
                  <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                    Icon
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableHeadTextStyle,
                      ...hideContent,
                      textAlign: "start",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell sx={{ ...tableHeadTextStyle, ...hideContent }}>
                    Phone
                  </TableCell>
                  <TableCell sx={tableHeadTextStyle}>Admin</TableCell>
                </TableHead>

                <TableBody>
                  {restaurants.map((admin) => {
                    return (
                      <TableRow>
                        <TableCell sx={tableBodyTextStyle}>
                          {admin.restaurantId?.name}
                        </TableCell>
                        <TableCell
                          sx={{ ...tableHeadTextStyle, ...hideContent }}
                        >
                          <img
                            src={admin.restaurantId?.icon}
                            title="icon"
                            style={{
                              objectFit: "cover",
                              width: "64px",
                              height: "64px",
                              borderRadius: "50%",
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            ...tableBodyTextStyle,
                            ...hideContent,
                            width: "200px",
                            textAlign: "start",
                          }}
                        >
                          {admin.restaurantId?.address}
                        </TableCell>
                        <TableCell
                          sx={{ ...tableHeadTextStyle, ...hideContent }}
                        >
                          {admin.restaurantId?.phone}
                        </TableCell>
                        <TableCell sx={tableBodyTextStyle}>
                          {admin.email}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Stack width={"100%"} justifyContent={"center"} direction={"row"}>
                <Stack
                  width={"120px"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <IconButton onClick={() => handlePagination(0)}>
                    <ArrowBackIosNewIcon
                      fontSize="small"
                      sx={{
                        color: currentPage == 1 ? "" : "black",
                      }}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: currentPage == 1 ? "#E4002B" : "black",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {currentPage != 1 ? currentPage - 1 : 1}
                  </Box>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: currentPage == 1 ? "black" : "#E4002B",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {currentPage != 1 ? currentPage : 2}
                  </Box>
                  <IconButton onClick={() => handlePagination(1)}>
                    <ArrowForwardIosIcon
                      fontSize="small"
                      sx={{
                        color: "black",
                      }}
                    />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
