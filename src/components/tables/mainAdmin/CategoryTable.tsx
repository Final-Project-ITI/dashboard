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
import Table from "@mui/material/Table";

/* -------- */
import { useEffect, useState } from "react";
import useRestaurantsCategory from "../../../hooks/api/mainAdmin/useResturantCategory";

/* -------- */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IRestaurantCategory } from "../../../models/restaurantCategory.model";

/* -------- */
import AddIcon from "@mui/icons-material/Add";

import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";
import MainButton from "../../shared/MainButton";

import AddRestaurantCategory from "../../popups/mainAdmin/restaurantCategory/AddRestaurantCategory";
import DeleteRestaurantCategoryPopup from "../../popups/mainAdmin/restaurantCategory/DeleteRestaurantCategoryPopup";
import Pagination from "../../shared/Pagination";
import EmptyTable from "../../shared/EmptyTable";

export default function MenuCategoryTable() {
  const [addCategoryTrigger, setAddCategoryTrigger] = useState(false);
  const [deleteCategoryTrigger, setDeleteCategoryTrigger] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const [data, setData, isLoading] = useRestaurantsCategory();
  const [restaurantCategories, setRestaurantCategories] = useState<
    IRestaurantCategory[]
  >([]);
  const [restaurantCategory, setRestaurantCategory] =
    useState<IRestaurantCategory>();
  const [currentPage, setCurrentPage] = useState(1);

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

  const skeletonRows = [0, 0, 0];

  const handleDeleteCategory = (item: IRestaurantCategory) => {
    setRestaurantCategory(item);
    setDeleteCategoryTrigger(true);
  };

  useEffect(() => {
    setRestaurantCategories(data.slice(0, 3));
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
            Categories
          </Typography>

          <MainButton
            width={"200px"}
            text={"Add Category"}
            Icon={AddIcon}
            handler={() => {
              setIsAdd(true);
              setAddCategoryTrigger(true);
            }}
            state={true}
          ></MainButton>
        </Stack>

        <Stack>
          <AddRestaurantCategory
            trigger={addCategoryTrigger}
            setTrigger={setAddCategoryTrigger}
            isAdd={isAdd}
            restaurantCategory={restaurantCategory}
            setData={setData}
          />
          <DeleteRestaurantCategoryPopup
            trigger={deleteCategoryTrigger}
            setTrigger={setDeleteCategoryTrigger}
            restaurantCategory={restaurantCategory}
            setData={setData}
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
              Categories
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead
                  sx={{
                    borderTop: "1px black solid",
                    borderBottom: "1px black solid",
                  }}
                >
                  <TableRow>
                    <TableCell sx={tableHeadTextStyle}>Title</TableCell>
                    <TableCell sx={tableHeadTextStyle}>Icon</TableCell>
                    <TableCell
                      sx={{
                        ...tableHeadTextStyle,
                        ...hideContent,
                        textAlign: "start",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell sx={tableHeadTextStyle}>Action</TableCell>
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
                          <TableCell colSpan={4}>
                            <Skeleton height={90} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </SkeletonTheme>
                  ) : restaurantCategories.length ? (
                    restaurantCategories.map((resCat) => {
                      return (
                        <TableRow key={resCat._id}>
                          <TableCell sx={tableBodyTextStyle}>
                            {resCat.name}
                          </TableCell>

                          <TableCell
                            sx={{
                              ...tableBodyTextStyle,
                            }}
                          >
                            <img
                              src={resCat.icon}
                              title="icon"
                              style={{
                                objectFit: "cover",
                                width: "64px",
                                height: "64px",
                                borderRadius: "50px",
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
                            {resCat.description}
                          </TableCell>

                          <TableCell sx={tableBodyTextStyle}>
                            <IconButton
                              onClick={() => {
                                setRestaurantCategory({ ...resCat });
                                setIsAdd(false);
                                setAddCategoryTrigger(true);
                              }}
                            >
                              <PinSVG />
                            </IconButton>

                            <IconButton
                              onClick={() => handleDeleteCategory(resCat)}
                            >
                              <TrashSVG />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <EmptyTable message={"no categories men to show"} />
                  )}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={3}
                data={data}
                setItems={setRestaurantCategories}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
