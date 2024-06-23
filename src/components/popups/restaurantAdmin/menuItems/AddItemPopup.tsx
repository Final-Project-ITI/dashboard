import { Box, Button, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

/* -------- */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddEditMenuItem from "../../../../hooks/api/restaurantAdmin/manu/useAddEditMenuItem";

/* -------- */
import { IFormInputMenuItem } from "../../../../models/formInputs/formInputMenuItem.model";
import { IIngredient } from "../../../../models/ingredient.model";
import { DVMenuItem } from "../../../../utils/defaultValues";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------- */
import { FormInputDropdown } from "../../../shared/formComponents/FormInputDropDown";
import { FormInputTags } from "../../../shared/formComponents/FormInputTags";
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddItemPopup({
  trigger,
  setTrigger,
  isAdd,
  menuItem,
  ingredients,
  setIngredients,
  categories,
  setData,
}: any) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IFormInputMenuItem>({
    defaultValues: DVMenuItem,
    mode: "onChange",
  });

  const [tags, setTags] = useState<IIngredient[]>([]);
  const icon = watch("icon", false);

  const [onSubmit, isLoading, error] = useAddEditMenuItem({
    setTrigger,
    menuItem,
    isAdd,
    tags,
    setTags,
    setData,
  });

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  useEffect(() => {
    toast.error(error?.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }, [error]);

  useEffect(() => {
    if (!isAdd) {
      setValue("title", menuItem?.title);
      setValue("price", menuItem?.price);
      setValue("description", menuItem?.description);
      setValue("category", menuItem?.menuCategoryId._id);
      if (menuItem?.ingredientsIds.length) setTags(menuItem.ingredientsIds);
      else setTags([]);
    }
  }, [menuItem]);

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
            <form>
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
                    type="text"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "item name is required",
                      },
                      maxLength: {
                        value: 25,
                        message: "item 35 characters",
                      },
                    }}
                    name="title"
                    control={control}
                    label="Item Name"
                  />
                </Box>
                <Box>
                  <Typography sx={labelStyle}>Description</Typography>
                  <FormInputText
                    type="text"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "description is required",
                      },
                      maxLength: {
                        value: 50,
                        message: "maximum 50 character",
                      },
                      minLength: {
                        value: 10,
                        message: "minimum 10 character",
                      },
                    }}
                    name="description"
                    control={control}
                    label="Description"
                  />
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Price</Typography>
                  <FormInputText
                    type="number"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "price is required",
                      },
                    }}
                    name="price"
                    control={control}
                    label="EGP"
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
                    {icon?.length ? icon[0]?.name : "Choose Icon"}
                    <input
                      {...register("icon", { required: true })}
                      name="icon"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      hidden
                    />
                  </Button>
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Category</Typography>
                  <FormInputDropdown
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "category name is required",
                      },
                    }}
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

                <LoadingButton
                  onClick={handleSubmit(onSubmit)}
                  variant={"contained"}
                  sx={{
                    width: "96px",
                  }}
                  loading={isLoading}
                  disabled={!isDirty || !isValid || !tags.length}
                  type="submit"
                >
                  {" "}
                  {isAdd ? "Add" : "Save"}{" "}
                </LoadingButton>
              </Stack>
            </form>
          </Box>
          <ToastContainer />
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
