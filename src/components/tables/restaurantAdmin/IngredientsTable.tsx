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
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

/* -------- */
import { IIngredient } from "../../../models/ingredient.model";
import { INGREDIENT_URL } from "../../../utils/urls";

/* -------- */
import AddIcon from "@mui/icons-material/Add";

import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";
import AddIngredient from "../../popups/restaurantAdmin/ingredients/AddIngredient";
import DeleteIngredientPopup from "../../popups/restaurantAdmin/ingredients/DeleteIngredient";
import MainButton from "../../shared/MainButton";
import Pagination from "../../shared/Pagination";

export default function IngredientsTable() {
  const [addIngredientTrigger, setAddIngredientTrigger] = useState(false);
  const [deleteItemTrigger, setDeleteCategoryTrigger] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<IIngredient[]>([]);

  const axiosPrivate = useAxiosPrivate();

  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [ingredient, setIngredient] = useState<IIngredient>();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteIngredient = (item: IIngredient) => {
    setIngredient(item);
    setDeleteCategoryTrigger(true);
  };

  const handleGetIngredients = async () => {
    try {
      const res = await axiosPrivate.get(INGREDIENT_URL);
      setData(res.data);
    } catch (e) {}
  };

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
    handleGetIngredients();
  }, []);

  useEffect(() => {
    setIngredients(data.slice(0, 5));
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
            Ingredients
          </Typography>

          <MainButton
            width={"200px"}
            text={"Add Ingredient"}
            Icon={AddIcon}
            handler={() => {
              setIsAdd(true);
              setAddIngredientTrigger(true);
            }}
            state={true}
          ></MainButton>
        </Stack>

        <Stack>
          <AddIngredient
            trigger={addIngredientTrigger}
            setTrigger={setAddIngredientTrigger}
            isAdd={isAdd}
            ingredient={ingredient}
          />
          <DeleteIngredientPopup
            trigger={deleteItemTrigger}
            setTrigger={setDeleteCategoryTrigger}
            ingredient={ingredient}
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
              Ingredients
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableCell sx={tableHeadTextStyle}>Ingredient</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Action</TableCell>
                </TableHead>

                <TableBody>
                  {ingredients.length
                    ? ingredients.map((ingredient) => {
                        return (
                          <TableRow>
                            <TableCell sx={tableBodyTextStyle}>
                              {ingredient.name}
                            </TableCell>

                            <TableCell sx={tableBodyTextStyle}>
                              <IconButton
                                onClick={() => {
                                  setIngredient(ingredient);
                                  setIsAdd(false);
                                  setAddIngredientTrigger(true);
                                }}
                              >
                                <PinSVG />
                              </IconButton>

                              <IconButton
                                onClick={() =>
                                  handleDeleteIngredient(ingredient)
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

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={4}
                data={data}
                setItems={setIngredients}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
