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
import useMenu from "../../../hooks/api/restaurantAdmin/manu/useMenu";

/* -------- */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../App";
import { IProduct } from "../../../models/product.model";

/* -------- */
import AddItemPopup from "../../popups/restaurantAdmin/menuItems/AddItemPopup";
import DeleteItemPopup from "../../popups/restaurantAdmin/menuItems/DeleteItemPopup";

import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";
import MainButton from "../../shared/MainButton";

import AddIcon from "@mui/icons-material/Add";
import useItemIngredients from "../../../hooks/api/restaurantAdmin/ingredients/useItemIngredients";
import useMenuCategory from "../../../hooks/api/restaurantAdmin/menuCategories/useMenuCategory";
import Pagination from "../../shared/Pagination";
import { DVProduct } from "../../../utils/defaultValues";

export default function MenuTable() {
  const [addItemTrigger, setAddItemTrigger] = useState(false);
  const [deleteItemTrigger, setDeleteItemTrigger] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const { user } = useContext(UserContext);

  const [data, setData, isLoading] = useMenu({ user });
  const [menuItems, setMenuItems] = useState<IProduct[]>([]);
  const [menuItem, setMenuItem] = useState<IProduct>();
  const [currentPage, setCurrentPage] = useState(1);

  const [categories] = useMenuCategory();
  const [ingredients, setIngredients] = useItemIngredients({ menuItem, isAdd });

  const tableHeadTextStyle = {
    textAlign: "start",
    color: "#0A0A0A80",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "none",
  };

  const tableBodyTextStyle = {
    textAlign: "start",
    fontSize: "16px",
    borderBottom: "none",
  };

  const skeletonRows = [0, 0, 0, 0];

  const handleDeleteItem = (item: IProduct) => {
    setMenuItem({ ...item });
    setDeleteItemTrigger(true);
  };

  useEffect(() => {
    setMenuItems(data.slice(0, 4));
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
            Menu
          </Typography>

          <MainButton
            width={"156px"}
            text={"Add item"}
            Icon={AddIcon}
            handler={() => {
              setIsAdd(true);
              setMenuItem(DVProduct);
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
            setData={setData}
          />
          <DeleteItemPopup
            trigger={deleteItemTrigger}
            setTrigger={setDeleteItemTrigger}
            menuItem={menuItem}
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
              List Menu
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
                    <TableCell sx={tableHeadTextStyle}>Item Name</TableCell>
                    <TableCell
                      sx={{
                        ...tableHeadTextStyle,
                        display: { md: "table-cell", xs: "none" },
                      }}
                    >
                      Icon
                    </TableCell>
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
                  </TableRow>
                </TableHead>

                <TableBody
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  {isLoading ? (
                    <SkeletonTheme
                      baseColor="transparent"
                      highlightColor="#0A0A0A80"
                    >
                      {skeletonRows.map((e, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
                            <Skeleton height={60} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </SkeletonTheme>
                  ) : menuItems.length ? (
                    menuItems.map((item) => (
                      <TableRow key={item._id}>
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
                            display: { md: "table-cell", xs: "none" },
                          }}
                        >
                          <Typography
                            sx={{
                              width: "100px",
                              textAlign: "start",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.ingredientsIds.map(
                              (ingredient) => ingredient.name + ", "
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell sx={tableBodyTextStyle}>
                          EGP {item.price}
                        </TableCell>
                        <TableCell sx={tableBodyTextStyle}>
                          <IconButton
                            onClick={() => {
                              setIsAdd(false);
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
                  ) : (
                    ""
                  )}
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
