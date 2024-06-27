import {
  Box,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";

/* -------- */
import { useEffect, useState } from "react";
import useRestaurantsAdmins from "../../../hooks/api/mainAdmin/useRestaurants";

/* -------- */
import { IUser } from "../../../models/user.model";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* -------- */
import AddIcon from "@mui/icons-material/Add";
import AddRestaurantPopup from "../../popups/mainAdmin/AddRestaurantPopup";
import MainButton from "../../shared/MainButton";
import Pagination from "../../shared/Pagination";
import useRestaurantsCategory from "../../../hooks/api/mainAdmin/useResturantCategory";

export default function RestaurantsTable() {
  const [addRestaurantTrigger, setAddRestaurantTrigger] = useState(false);
  const [data, setData, isLoading] = useRestaurantsAdmins();
  const [restaurantCategories, setRestaurantCategories] =
    useRestaurantsCategory();
  const [restaurants, setRestaurants] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skeletonRows = [0, 0, 0, 0, 0];

  useEffect(() => {
    setRestaurants(data.slice(0, 4));
  }, [data]);

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

  useEffect(() => {
    // console.log(data);
  }, [data]);

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
          width={"100%"}
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
            width={"220px"}
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
            setData={setData}
            trigger={addRestaurantTrigger}
            setTrigger={setAddRestaurantTrigger}
            restaurantCategories={restaurantCategories}
            setRestaurantCategories={setRestaurantCategories}
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
                  <TableRow
                    sx={{
                      borderTop: "1px black solid",
                      borderBottom: "1px black solid",
                    }}
                  >
                    <TableCell sx={tableHeadTextStyle}>
                      Restaurant Name
                    </TableCell>
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
                  </TableRow>
                </TableHead>

                <TableBody>
                  {isLoading ? (
                    <SkeletonTheme
                      baseColor="transparent"
                      highlightColor="#0A0A0A80"
                    >
                      {skeletonRows.map((e, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
                            <Skeleton height={40} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </SkeletonTheme>
                  ) : (
                    restaurants.map((admin) => {
                      return (
                        <TableRow key={admin._id}>
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
                    })
                  )}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={4}
                data={data}
                setItems={setRestaurants}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
