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
import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";

import AddCategory from "../../popups/restaurantAdmin/categories/AddCategory";
import DeleteCategoryPopup from "../../popups/restaurantAdmin/categories/DeleteCategory";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IMenuCategory } from "../../../models/menuCategory.model";
import { MENU_CATEGORY_URL } from "../../../utils/URLs";

export default function CategoryTable() {
  const [addCategoryTrigger, setAddCategoryTrigger] = useState(false);
  const [deleteCategoryTrigger, setDeleteCategoryTrigger] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<IMenuCategory[]>([]);
  const [menuCategories, setMenuCategories] = useState<IMenuCategory[]>([]);
  const [menuCategory, setMenuCategory] = useState<IMenuCategory>();
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

  const handleDeleteCategory = (item: IMenuCategory) => {
    setMenuCategory(item);
    setDeleteCategoryTrigger(true);
  };

  const handleGetMenuCategories = async () => {
    try {
      const res = await axiosPrivate.get(MENU_CATEGORY_URL);
      setData(res.data);
    } catch (e) {}
  };

  const handlePagination = async (direction: number) => {
    const pageSize = 5;
    let page = currentPage;

    if (direction && currentPage == Math.ceil(data.length / pageSize)) return;
    if (!direction && currentPage == 1) return;

    setCurrentPage((pre) => {
      if (direction) {
        page++;
        return ++pre;
      } else {
        page--;
        return --pre;
      }
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setMenuCategories(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    handleGetMenuCategories();
  }, []);

  useEffect(() => {
    setMenuCategories(data.slice(0, 5));
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
          <AddCategory
            trigger={addCategoryTrigger}
            setTrigger={setAddCategoryTrigger}
            isAdd={isAdd}
            menuCategory={menuCategory}
          />
          <DeleteCategoryPopup
            trigger={deleteCategoryTrigger}
            setTrigger={setDeleteCategoryTrigger}
            menuCategory={menuCategory}
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
                  <TableCell sx={tableHeadTextStyle}>Category</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Action</TableCell>
                </TableHead>

                <TableBody>
                  {menuCategories.length
                    ? menuCategories.map((menuCategory) => {
                        return (
                          <TableRow>
                            <TableCell sx={tableBodyTextStyle}>
                              {menuCategory.name}
                            </TableCell>

                            <TableCell sx={tableBodyTextStyle}>
                              <IconButton
                                onClick={() => {
                                  setMenuCategory(menuCategory);
                                  setIsAdd(false);
                                  setAddCategoryTrigger(true);
                                }}
                              >
                                <PinSVG />
                              </IconButton>

                              <IconButton
                                onClick={() =>
                                  handleDeleteCategory(menuCategory)
                                }
                              >
                                <TrashSVG />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
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
                        color:
                          currentPage == Math.ceil(data.length / 5)
                            ? ""
                            : "black",
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
