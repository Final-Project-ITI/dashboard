import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddCashier from "../../../../hooks/api/restaurantAdmin/cashiers/useAddCashier";

/* -------- */
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regEmail, regFullName } from "../../../../regex/regex";
import { DVAddCashier } from "../../../../utils/defaultValues";

/* -------- */
import LoadingButton from "@mui/lab/LoadingButton";
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddCashier({ setData, trigger, setTrigger }: any) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { isDirty, isValid },
  } = useForm<IFormInputCashier>({
    defaultValues: DVAddCashier,
    mode: "onChange",
  });

  const [onSubmit, isLoading, error] = useAddCashier({ setTrigger, setData });

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
                  <Typography sx={labelStyle}>Cashier Name</Typography>
                  <FormInputText
                    type="text"
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "cashier name is required",
                      },
                      pattern: {
                        value: regFullName,
                        message: "invalid cashier name",
                      },
                    }}
                    name="fullName"
                    control={control}
                    label="Add Cashier Name"
                  />
                </Box>
                <Box>
                  <Typography sx={labelStyle}>E-Mail</Typography>
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
                  <Typography sx={labelStyle}>Password</Typography>
                  <FormInputText
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "password is required",
                      },
                      minLength: {
                        value: 7,
                        message: "password must be minimum 7 characters",
                      },
                    }}
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
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
                  Add{" "}
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
