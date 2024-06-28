import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddRestaurantCategory from "../../../../hooks/api/mainAdmin/useAddRestaurantCategory";

/* -------- */
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DVCategory } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddRestaurantCategory({
  trigger,
  setTrigger,
  isAdd,
  restaurantCategory,
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
  } = useForm<IFormInputRestaurantCategory>({
    defaultValues: DVCategory,
    mode: "onChange",
  });

  const icon = watch("icon", false);

  const [onSubmit, isLoading, error] = useAddRestaurantCategory({
    setTrigger,
    restaurantCategory,
    isAdd,
    setData,
    reset,
  });

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
      setValue("name", restaurantCategory?.name);
      setValue("description", restaurantCategory?.description);
    }
  }, [restaurantCategory]);

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
                Add Restauarnt Category
              </Typography>
              <Stack spacing={"8px"}>
                <Box>
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
                        message: "maximum 25 characters",
                      },
                    }}
                    name="name"
                    control={control}
                    label="name"
                  />
                </Box>

                <Box>
                  <FormInputText
                    type="text"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "category name is required",
                      },
                      maxLength: {
                        value: 100,
                        message: "maximum 100 characters",
                      },
                    }}
                    name="description"
                    control={control}
                    label="Description"
                  />
                </Box>

                <Box>
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
