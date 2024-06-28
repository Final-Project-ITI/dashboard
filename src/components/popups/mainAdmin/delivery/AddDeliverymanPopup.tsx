import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/* -------- */
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regEmail, regPhone } from "../../../../regex/regex";
import { DVAddDelivery } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";
import useAddDeliveryMan from "../../../../hooks/api/mainAdmin/useAddDeliveryman";
import { IFormInputDeliveryMan } from "../../../../models/formInputs/formInputDeliveryMan.model";

export default function AddDeliverymanPopup({
  setData,
  trigger,
  setTrigger,
}: any) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IFormInputDeliveryMan>({
    defaultValues: DVAddDelivery,
    mode: "onChange",
  });

  const [onSubmit, isLoading, error] = useAddDeliveryMan({
    setTrigger,
    setData,
    reset,
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
            width={{ xl: "520px", md: "55%", xs: "85%" }}
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
              Add delivery man
            </Typography>
            <form>
              <Stack spacing={"16px"}>
                <Box>
                  <FormInputText
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "email is required",
                      },
                      pattern: {
                        value: regEmail,
                        message: "invalid email",
                      },
                    }}
                    name="email"
                    control={control}
                    label="Email"
                    type="email"
                  />
                </Box>

                <Box>
                  <FormInputText
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "phone is required",
                      },
                      pattern: {
                        value: regPhone,
                        message: "invalid phone",
                      },
                    }}
                    name="phone"
                    control={control}
                    label="Phone"
                    type="text"
                  />
                </Box>

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
                    Add{" "}
                  </LoadingButton>
                </Stack>
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
