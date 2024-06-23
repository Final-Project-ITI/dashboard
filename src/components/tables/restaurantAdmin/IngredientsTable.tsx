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
import useIngredients from "../../../hooks/api/restaurantAdmin/ingredients/useIngredients";

/* -------- */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IIngredient } from "../../../models/ingredient.model";

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

  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [ingredient, setIngredient] = useState<IIngredient>();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteIngredient = (item: IIngredient) => {
    setIngredient(item);
    setDeleteCategoryTrigger(true);
  };

  const [data, setData, isLoading] = useIngredients();

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
            width={"220px"}
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
            setData={setData}
          />
          <DeleteIngredientPopup
            trigger={deleteItemTrigger}
            setTrigger={setDeleteCategoryTrigger}
            ingredient={ingredient}
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
              Ingredients
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeadTextStyle}>Ingredient</TableCell>
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
                  ) : ingredients.length ? (
                    ingredients.map((ingredient) => {
                      return (
                        <TableRow key={ingredient._id}>
                          <TableCell sx={tableBodyTextStyle}>
                            {ingredient.name}
                          </TableCell>

                          <TableCell sx={tableBodyTextStyle}>
                            <IconButton
                              onClick={() => {
                                setIngredient({ ...ingredient });
                                setIsAdd(false);
                                setAddIngredientTrigger(true);
                              }}
                            >
                              <PinSVG />
                            </IconButton>

                            <IconButton
                              onClick={() => handleDeleteIngredient(ingredient)}
                            >
                              <TrashSVG />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
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
                setItems={setIngredients}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
