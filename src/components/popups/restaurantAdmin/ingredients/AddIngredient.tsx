import { Box, Button, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddEditIngredient from "../../../../hooks/api/restaurantAdmin/ingredients/useAddEditIngredient";

/* -------- */
import "react-toastify/dist/ReactToastify.css";
import { IFormInputIngredient } from "../../../../models/formInputs/formInputIngredient.model";
import { DVIngredient } from "../../../../utils/defaultValues";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddIngredient({
  trigger,
  setTrigger,
  isAdd,
  ingredient,
  setData,
}: any) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<IFormInputIngredient>({
    defaultValues: DVIngredient,
    mode: "onChange",
  });

  const [onSubmit, isLoading, error] = useAddEditIngredient({
    setTrigger,
    ingredient,
    isAdd,
    reset,
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
      setValue("name", ingredient?.name);
    }
  }, [ingredient]);

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
                Ingredients
              </Typography>
              <Stack spacing={"8px"}>
                <Box>
                  <FormInputText
                    type="text"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "ingredient name is required",
                      },
                      maxLength: {
                        value: 25,
                        message: "maximum 35 characters",
                      },
                    }}
                    name="name"
                    control={control}
                    label="Ingredient"
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
