import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
import { useContext, useEffect, useState } from "react";

import AddItemPopup from "../../popups/restaurantAdmin/menu/AddItemPopup";
import DeleteItemPopup from "../../popups/restaurantAdmin/menu/DeleteItemPopup";

import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { IProduct } from "../../../models/product.model";
import {
  INGREDIENT_URL,
  MENU_CATEGORY_URL,
  PRODUCT_URL,
} from "../../../utils/URLs";
import MainButton from "../../shared/MainButton";

import { Context } from "../../../App";
import { IIngredient } from "../../../models/ingredient.model";

export default function MenuTable() {
  const [addItemTrigger, setAddItemTrigger] = useState(false);
  const [deleteItemTrigger, setDeleteItemTrigger] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [isAdd, setIsAdd] = useState(false);

  const [data, setData] = useState<IProduct[]>([]);
  const [menuItems, setMenuItems] = useState<IProduct[]>([]);
  const [menuItem, setMenuItem] = useState<IProduct>();
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState<IIngredient[]>([]);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const user = useContext(Context);

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

  useEffect(() => {
    handleGetMenu();
  }, [user]);

  const handleGetMenu = async () => {
    try {
      const res = await axiosPrivate.get(
        PRODUCT_URL + "/" + user.restaurantId?._id
      );
      setData(res.data);
    } catch (e) {}
  };

  const handleGetIngredients = async () => {
    try {
      const res = await axiosPrivate.get(INGREDIENT_URL);

      const ingredientsIds = menuItem?.ingredientsIds.map(
        (ingredient: IIngredient) => ingredient._id
      );

      setIngredients(
        res.data.filter(
          (ingredient: IIngredient) => !ingredientsIds?.includes(ingredient._id)
        )
      );
    } catch (e) {}
  };

  const handleGetMenuCategories = async () => {
    try {
      const res = await axiosPrivate.get(MENU_CATEGORY_URL);
      setCategories(res.data);
    } catch (e) {}
  };

  const handleDeleteItem = (item: IProduct) => {
    setMenuItem({ ...item });
    setDeleteItemTrigger(true);
  };

  const handlePagination = async (direction: number) => {
    const pageSize = 4;
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

    setMenuItems(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    handleGetMenuCategories();
    setMenuItems(data.slice(0, 4));
  }, [data]);

  useEffect(() => {
    handleGetIngredients();
  }, [menuItem]);

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
            Menu
          </Typography>

          <MainButton
            width={"156px"}
            text={"Add item"}
            Icon={AddIcon}
            handler={() => {
              setIsAdd(true);
              handleGetIngredients();
              handleGetMenuCategories();
              setAddItemTrigger(true);
            }}
            state={true}
          ></MainButton>
        </Stack>

        <Stack>
          <AddItemPopup
            trigger={addItemTrigger}
            setTrigger={setAddItemTrigger}
            isAdd={isAdd}
            menuItem={menuItem}
            ingredients={ingredients}
            setIngredients={setIngredients}
            categories={categories}
          />
          <DeleteItemPopup
            trigger={deleteItemTrigger}
            setTrigger={setDeleteItemTrigger}
            menuItem={menuItem}
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
              List Menu
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableCell sx={tableHeadTextStyle}>Item Name</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Icon</TableCell>
                  <TableCell
                    sx={{
                      ...tableHeadTextStyle,
                      textAlign: "start",
                      display: { md: "table-cell", xs: "none" },
                    }}
                  >
                    Ingredients
                  </TableCell>
                  <TableCell sx={tableHeadTextStyle}>Price</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Action</TableCell>
                </TableHead>

                <TableBody>
                  {menuItems.length
                    ? menuItems.map((item) => (
                        <TableRow>
                          <TableCell sx={tableBodyTextStyle}>
                            {item.title}
                          </TableCell>
                          <TableCell
                            sx={{
                              ...tableBodyTextStyle,
                              display: { md: "table-cell", xs: "none" },
                            }}
                          >
                            <img
                              src={item.icon}
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
                              width: "200px",
                              textAlign: "start",
                              display: { md: "table-cell", xs: "none" },
                            }}
                          >
                            {item.ingredientsIds.map(
                              (ingredient) => ingredient.name + ", "
                            )}
                          </TableCell>
                          <TableCell sx={tableBodyTextStyle}>
                            EGP {item.price}
                          </TableCell>
                          <TableCell sx={tableBodyTextStyle}>
                            <IconButton
                              onClick={() => {
                                setIsAdd(false);
                                handleGetIngredients();
                                setMenuItem({ ...item });
                                setAddItemTrigger(true);
                              }}
                            >
                              <PinSVG />
                            </IconButton>

                            <IconButton onClick={() => handleDeleteItem(item)}>
                              <TrashSVG />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
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
                          currentPage == Math.ceil(data.length / 4)
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
