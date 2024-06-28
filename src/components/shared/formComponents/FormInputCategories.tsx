import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* -------- */
import { ChangeEvent, useEffect, useState } from "react";

/* -------- */
import { IRestaurantCategory } from "../../../models/restaurantCategory.model";

export const FormInputCategories = ({
  restaurantCategories,
  setRestaurantCategories,
  tags,
  setTags,
}: {
  restaurantCategories: IRestaurantCategory[];
  setRestaurantCategories: any;
  tags: IRestaurantCategory[];
  setTags: any;
}) => {
  const [searchRestaurantCategories, setSearchRestaurantCategories] = useState<
    IRestaurantCategory[]
  >([]);
  const [searchText, setSearchText] = useState("");

  const handleSelectRestaurantCategory = (resCat: IRestaurantCategory) => {
    setTags((pre: IRestaurantCategory[]) => [...pre, resCat]);

    setRestaurantCategories((pre: IRestaurantCategory[]) =>
      pre.filter((pre) => pre.name !== resCat.name)
    );
    setSearchRestaurantCategories([]);
    setSearchText("");
  };

  const handleRemoveRestaurantCategory = (resCat: IRestaurantCategory) => {
    setRestaurantCategories((pre: IRestaurantCategory[]) => [...pre, resCat]);

    setTags((pre: IRestaurantCategory[]) =>
      pre.filter((pre) => pre.name !== resCat.name)
    );
  };

  const handleOnChange = (e: ChangeEvent) => {
    setSearchText((e.target as HTMLInputElement).value);
  };

  const handleOnFocus = () => {
    if (searchText) {
      setSearchRestaurantCategories(
        restaurantCategories.filter((resCat) =>
          resCat.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setSearchRestaurantCategories([]);
    }
  };

  useEffect(() => {
    handleOnFocus();
  }, [searchText]);

  return (
    <Stack
      backgroundColor={"#E8DCCC"}
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
            key={tag._id}
          >
            {tag.name}
            <IconButton onClick={() => handleRemoveRestaurantCategory(tag)}>
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
        value={searchText}
      />
      {searchRestaurantCategories.length ? (
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
          {searchRestaurantCategories?.map((resCat) => (
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
              key={resCat._id}
              style={{ justifyContent: "flex-start" }}
              onClick={() => handleSelectRestaurantCategory(resCat)}
            >
              {resCat.name}
            </Button>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
};
