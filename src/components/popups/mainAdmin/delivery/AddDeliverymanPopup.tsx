import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddRestaurant from "../../../../hooks/api/mainAdmin/useAddRestaurant";

/* -------- */
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IFormInputRestaurant } from "../../../../models/formInputs/formInputRestaurant.model";
import { regEmail, regPhone } from "../../../../regex/regex";
import { DVAddRestaurant } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";
import { IRestaurantCategory } from "../../../../models/restaurantCategory.model";
import { FormInputCategories } from "../../../shared/formComponents/FormInputCategories";

export default function AddDeliverymanPopup({
  setData,
  trigger,
  setTrigger,
  restaurantCategories,
  setRestaurantCategories,
}: any) {
  const {
    handleSubmit,
    reset,
    control,
    register,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IFormInputRestaurant>({
    defaultValues: DVAddRestaurant,
    mode: "onChange",
  });
  const [tags, setTags] = useState<IRestaurantCategory[]>([]);

  const [onSubmit, isLoading, error] = useAddRestaurant({
    setTrigger,
    setData,
    reset,
    tags,
    setTags,
    setRestaurantCategories,
  });

  const icon = watch("icon", false);
  const banner = watch("banner", false);

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
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Add Restaurant
            </Typography>
            <Stack spacing={"8px"}>
              <form>
                <Box>
                  <Typography sx={labelStyle}>Restaurant Name</Typography>
                  <FormInputText
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "restaurant name is required",
                      },
                    }}
                    name="name"
                    control={control}
                    label="Restaurant Name"
                    type="text"
                  />
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Email</Typography>
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
                  <Typography sx={labelStyle}>Address</Typography>
                  <FormInputText
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "address is required",
                      },
                      maxLength: {
                        value: 100,
                        message: "maximum 100 character",
                      },
                      minLength: {
                        value: 20,
                        message: "minimum 20 character",
                      },
                    }}
                    name="address"
                    control={control}
                    label="Address"
                    type="text"
                  />
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Description</Typography>
                  <FormInputText
                    register={register}
                    validation={{
                      required: {
                        value: true,
                        message: "description is required",
                      },
                      maxLength: {
                        value: 100,
                        message: "maximum 255 character",
                      },
                      minLength: {
                        value: 20,
                        message: "minimum 20 character",
                      },
                    }}
                    name="description"
                    control={control}
                    label="Description"
                    type="text"
                  />
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Phone</Typography>
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

                <Box>
                  <Typography sx={labelStyle}>Categories</Typography>
                  <FormInputCategories
                    restaurantCategories={restaurantCategories}
                    setRestaurantCategories={setRestaurantCategories}
                    tags={tags}
                    setTags={setTags}
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
                  <Typography sx={labelStyle}>Banner</Typography>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    color="secondary"
                  >
                    {banner?.length ? banner[0]?.name : "Choose Banner"}
                    <input
                      {...register("banner", { required: true })}
                      name="banner"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      hidden
                    />
                  </Button>
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
                    disabled={!isDirty || !isValid || !tags.length}
                    type="submit"
                  >
                    {" "}
                    Add{" "}
                  </LoadingButton>
                </Stack>
              </form>
            </Stack>
          </Box>

          <ToastContainer />
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
