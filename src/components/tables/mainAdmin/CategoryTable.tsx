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
import { useEffect, useState } from "react";

/* -------- */
import useRestaurantsCategory from "../../../hooks/api/mainAdmin/useResturantCategory";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IRestaurantCategory } from "../../../models/restaurantCategory.model";

/* -------- */
import AddIcon from "@mui/icons-material/Add";

import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";
import AddRestaurantPopup from "../../popups/mainAdmin/AddRestaurantPopup";
import DeleteIngredientPopup from "../../popups/restaurantAdmin/ingredients/DeleteIngredient";
import MainButton from "../../shared/MainButton";
import Pagination from "../../shared/Pagination";

export default function CategoryTable() {
  const [addCategoryTrigger, setAddCategoryTrigger] = useState(false);
  const [deleteCategoryTrigger, setDeleteCategoryTrigger] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const [categories, setCategories] = useState<IRestaurantCategory[]>([]);
  const [category, setCategory] = useState<IRestaurantCategory>();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteCategory = (item: IRestaurantCategory) => {
    setCategory(item);
    setDeleteCategoryTrigger(true);
  };

  const [data, isLoading] = useRestaurantsCategory();

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

  const skeletonRows = [0, 0, 0, 0, 0];

  useEffect(() => {
    setCategories(data.slice(0, 5));
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
          width={"85%"}
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
            width={"220px"}
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
          <AddRestaurantPopup
            trigger={addCategoryTrigger}
            setTrigger={setAddCategoryTrigger}
            isAdd={isAdd}
            category={category}
          />
          <DeleteIngredientPopup
            trigger={deleteCategoryTrigger}
            setTrigger={setDeleteCategoryTrigger}
            category={category}
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
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeadTextStyle}>ID</TableCell>
                    <TableCell
                      sx={{
                        ...tableHeadTextStyle,
                        display: { md: "table-cell", xs: "none" },
                      }}
                    >
                      Icon
                    </TableCell>
                    <TableCell sx={tableHeadTextStyle}>Title</TableCell>
                    <TableCell
                      sx={{
                        ...tableHeadTextStyle,
                        display: { md: "table-cell", xs: "none" },
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
                          <TableCell colSpan={5}>
                            <Skeleton height={40} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </SkeletonTheme>
                  ) : categories.length ? (
                    categories.map((category) => (
                      <TableRow key={category._id}>
                        <TableCell sx={tableBodyTextStyle}>
                          {category._id}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...tableBodyTextStyle,
                            display: { md: "table-cell", xs: "none" },
                          }}
                        >
                          <img
                            src={category?.icon}
                            alt="icon"
                            style={{
                              objectFit: "cover",
                              width: "64px",
                              height: "64px",
                              borderRadius: "50%",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={tableBodyTextStyle}>
                          {category.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            ...tableBodyTextStyle,
                            display: { md: "table-cell", xs: "none" },
                          }}
                        >
                          {category.description}
                        </TableCell>
                        <TableCell sx={tableBodyTextStyle}>
                          <IconButton
                            onClick={() => {
                              setCategory({ ...category });
                              setIsAdd(false);
                              setAddCategoryTrigger(true);
                            }}
                          >
                            <PinSVG />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteCategory(category)}
                          >
                            <TrashSVG />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={5}
                data={data}
                setItems={setCategories}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
