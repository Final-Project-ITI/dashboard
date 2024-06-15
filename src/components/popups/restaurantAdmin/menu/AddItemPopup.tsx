import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { IIngredient } from "../../../../models/ingredient.model";
import { CREATE_PRODUCT_URL } from "../../../../utils/URLs";
import { FormInputDropdown } from "../../../shared/formComponents/FormInputDropDown";
import { FormInputTags } from "../../../shared/formComponents/FormInputTags";
import { FormInputText } from "../../../shared/formComponents/FormInputText";

interface IFormInput {
  title: string;
  price: string;
  icon: any;
  description: string;
  category: string;
}

const defaultValues = {
  title: "",
  price: "",
  description: "",
  category: "",
};

export default function AddItemPopup({
  trigger,
  setTrigger,
  isAdd,
  menuItem,
  ingredients,
  setIngredients,
  categories,
}: any) {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, register } = methods;
  const [tags, setTags] = useState<IIngredient[]>([]);
  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    if (data.icon[0]) formData.append("icon", data.icon[0]);
    formData.append("menuCategoryId", data.category);
    tags.forEach((element) => {
      formData.append("ingredientsIds", element._id);
    });

    let res: any;

    if (isAdd) res = await axiosPrivate.post(CREATE_PRODUCT_URL, formData);
    else {
      res = await axiosPrivate.patch(
        CREATE_PRODUCT_URL + "/" + menuItem?._id,
        formData
      );
    }
  };

  useEffect(() => {
    if (!isAdd) {
      setValue("title", menuItem?.title);
      setValue("price", menuItem?.price);
      setValue("description", menuItem?.description);
      setValue("category", menuItem?.menuCategoryId);
      setTags(menuItem?.ingredientsIds);
    }
  }, [menuItem]);

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  return (
    <>
      {trigger ? (
        <Stack
          position={"fixed"}
          top={"0"}
          left={"0"}
          width={"100vw"}
          height={"100vh"}
          zIndex={1}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            width={{ xl: "35%", md: "55%", xs: "85%" }}
            sx={{
              backgroundColor: "#F3ECE4",
              borderRadius: "15px",
              padding: "24px 109px 32px 109px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Add Item
            </Typography>
            <Stack spacing={"8px"}>
              <Box>
                <Typography sx={labelStyle}>Item Name</Typography>
                <FormInputText
                  name="title"
                  control={control}
                  label="Item Name"
                  type="text"
                />
              </Box>
              <Box>
                <Typography sx={labelStyle}>Description</Typography>
                <FormInputText
                  name="description"
                  control={control}
                  label="Description"
                  type="text"
                />
              </Box>

              <Box>
                <Typography sx={labelStyle}>Price</Typography>
                <FormInputText
                  name="price"
                  control={control}
                  label="EGP"
                  type="number"
                />
              </Box>

              <Box>
                <Typography sx={labelStyle}>Icon</Typography>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  color="secondary"
                >
                  Choose File
                  <input {...register("icon")} name="icon" type="file" hidden />
                </Button>
              </Box>

              <Box>
                <Typography sx={labelStyle}>Category</Typography>
                <FormInputDropdown
                  name="category"
                  control={control}
                  label="Choose Category"
                  categories={categories}
                />
              </Box>
              <Box>
                <Typography sx={labelStyle}>Ingredients</Typography>
                <FormInputTags
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  tags={tags}
                  setTags={setTags}
                />
              </Box>
            </Stack>

            <Stack
              marginTop={"24px"}
              spacing={"40px"}
              width={"100%"}
              justifyContent={"center"}
              direction={"row"}
            >
              <Button
                onClick={() => {
                  reset();
                  setTrigger(false);
                  setTags([]);
                }}
                variant={"outlined"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Cancel{" "}
              </Button>

              <Button
                onClick={handleSubmit(onSubmit)}
                variant={"contained"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                {isAdd ? "Add" : "Save"}{" "}
              </Button>
            </Stack>
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
