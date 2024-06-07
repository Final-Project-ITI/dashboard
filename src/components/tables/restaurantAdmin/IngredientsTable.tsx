import { useState } from "react";
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
import AddIngredient from "../../popups/restaurantAdmin/ingredients/AddIngredient";
import DeleteIngredientPopup from "../../popups/restaurantAdmin/ingredients/DeleteIngredient";

export default function IngredientsTable() {
  const [addIngredientTrigger, setAddIngredientTrigger] = useState(false);
  const [deleteItemTrigger, setDeleteCategoryTrigger] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

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

  const handleDeleteIngredient = () => {
    setDeleteCategoryTrigger(true);
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
          />
          <DeleteIngredientPopup
            trigger={deleteItemTrigger}
            setTrigger={setDeleteCategoryTrigger}
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
                  <TableRow>
                    <TableCell sx={tableBodyTextStyle}>Tomato</TableCell>

                    <TableCell sx={tableBodyTextStyle}>
                      <IconButton
                        onClick={() => {
                          setAddIngredientTrigger(true);
                          setIsAdd(false);
                        }}
                      >
                        <PinSVG />
                      </IconButton>

                      <IconButton onClick={() => handleDeleteIngredient()}>
                        <TrashSVG />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Stack width={"100%"} justifyContent={"center"} direction={"row"}>
                <Stack
                  width={"120px"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <IconButton>
                    <ArrowBackIosNewIcon
                      fontSize="small"
                      sx={{
                        color: "black",
                      }}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: "black",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </Box>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: "#E4002B",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Box>
                  <IconButton>
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            <Stack></Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
