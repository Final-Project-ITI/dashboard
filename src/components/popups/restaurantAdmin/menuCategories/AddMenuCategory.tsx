import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddEditMenuCategory from "../../../../hooks/api/restaurantAdmin/menuCategories/useAddEditMenuCategory";

/* -------- */
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DVCategory } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddCategory({
  trigger,
  setTrigger,
  isAdd,
  menuCategory,
}: any) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IFormInputCategory>({
    defaultValues: DVCategory,
    mode: "onChange",
  });

  const icon = watch("icon", false);

  const [onSubmit, isLoading, error] = useAddEditMenuCategory({
    setTrigger,
    menuCategory,
    isAdd,
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
      setValue("name", menuCategory?.name);
    }
  }, [menuCategory]);

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
                Categories
              </Typography>
              <Stack spacing={"8px"}>
                <Box>
                  <Typography sx={labelStyle}>Category</Typography>
                  <FormInputText
                    type="text"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "category name is required",
                      },
                      maxLength: {
                        value: 25,
                        message: "maximum 35 characters",
                      },
                    }}
                    name="name"
                    control={control}
                    label="Category"
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
                  disabled={!isDirty || !isValid}
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
