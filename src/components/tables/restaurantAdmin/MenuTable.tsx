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
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

/* -------- */
import { UserContext } from "../../../App";
import { IIngredient } from "../../../models/ingredient.model";
import { IProduct } from "../../../models/product.model";
import {
  INGREDIENT_URL,
  MENU_CATEGORY_URL,
  PRODUCT_URL,
} from "../../../utils/urls";

/* -------- */
import AddItemPopup from "../../popups/restaurantAdmin/menu/AddItemPopup";
import DeleteItemPopup from "../../popups/restaurantAdmin/menu/DeleteItemPopup";

import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";
import MainButton from "../../shared/MainButton";

import AddIcon from "@mui/icons-material/Add";
import Pagination from "../../shared/Pagination";

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

  const { user } = useContext(UserContext);

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

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={4}
                data={data}
                setItems={setMenuItems}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
