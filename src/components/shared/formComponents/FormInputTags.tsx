import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { IIngredient } from "../../../models/ingredient.model";

export const FormInputTags = ({
  ingredients,
  setIngredients,
  tags,
  setTags,
}: {
  ingredients: IIngredient[];
  setIngredients: any;
  tags: IIngredient[];
  setTags: any;
}) => {
  const [searchIngredients, setSearchIngredients] = useState<IIngredient[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleSelectIngredient = (ingredient: IIngredient) => {
    setTags((pre: IIngredient[]) => [...pre, ingredient]);

    setIngredients((pre: IIngredient[]) =>
      pre.filter((preIngredient) => preIngredient.name !== ingredient.name)
    );
    setSearchIngredients([]);
  };

  const handleRemoveIngredient = (ingredient: IIngredient) => {
    setIngredients((pre: IIngredient[]) => [...pre, ingredient]);

    setTags((pre: IIngredient[]) =>
      pre.filter((preIngredient) => preIngredient.name !== ingredient.name)
    );
  };

  const handleOnChange = (e: ChangeEvent) => {
    setSearchText((e.target as HTMLInputElement).value);
  };

  const handleOnFocus = () => {
    if (searchText) {
      setSearchIngredients(
        ingredients.filter((ingredient) =>
          ingredient.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setSearchIngredients([]);
    }
  };

  useEffect(() => {
    handleOnFocus();
  }, [searchText]);

  return (
    <Stack
      backgroundColor={"#E8DCCC"}
      fullWidth
      padding={"10px"}
      position={"relative"}
      borderRadius={"4px"}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        flexWrap={"wrap"}
      >
        {tags?.map((tag) => (
          <Box
            sx={{
              backgroundColor: "#d84339",
              color: "white",
              padding: "0px 0px 0px 20px",
              borderRadius: "50px",
              marginRight: "5px",
              marginTop: "5px",
            }}
          >
            {tag.name}
            <IconButton onClick={() => handleRemoveIngredient(tag)}>
              <CloseIcon
                sx={{
                  fontSize: "20px",
                  color: "white",
                }}
              />
            </IconButton>
          </Box>
        ))}
      </Stack>

      <TextField
        sx={{
          "& fieldset": { border: "none" },
        }}
        placeholder="Enter an ingredient ..."
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        autoComplete="off"
      />
      {searchIngredients.length ? (
        <Stack
          position={"absolute"}
          height={"100px"}
          width={"100%"}
          top={"100%"}
          zIndex={1}
          right={0}
          spacing={"5px"}
          sx={{
            backgroundColor: "#E8DCCC",
            overflow: "scroll",
            overflowX: "hidden",
            borderTop: "1px solid #d84339",
          }}
        >
          {searchIngredients?.map((ingredient) => (
            <Button
              sx={{
                cursor: "pointer",
                backgroundColor: "#E8DCCC",
                borderRadius: "50px",
                padding: "5px 20px",
                "&:hover": {
                  backgroundColor: "#d84339",
                  color: "white",
                },
                textAlign: "left",
              }}
              style={{ justifyContent: "flex-start" }}
              onClick={() => handleSelectIngredient(ingredient)}
            >
              {ingredient.name}
            </Button>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
};
