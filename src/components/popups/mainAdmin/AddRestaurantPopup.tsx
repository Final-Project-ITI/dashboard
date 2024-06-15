import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputFile } from "../../shared/formComponents/FormInputFile";
import { FormInputText } from "../../shared/formComponents/FormInputText";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { CREATE_RESTAURANT_URL } from "../../../utils/URLs";

interface IFormInput {
  name: string;
  email: string;
  address: string;
  description: string;
  phone: string;
  icon: any;
  banner: any;
}

const defaultValues = {
  name: "",
  email: "",
  address: "",
  description: "",
  phone: "",
};

export default function AddRestaurantPopup({ trigger, setTrigger }: any) {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch, register } = methods;
  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("icon", data.icon[0]);
    formData.append("banner", data.banner[0]);

    const res = await axiosPrivate.post(CREATE_RESTAURANT_URL, formData);
  };

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
              Add Restaurant
            </Typography>
            <Stack spacing={"8px"}>
              <form>
                <Box>
                  <Typography sx={labelStyle}>Restaurant Name</Typography>
                  <FormInputText
                    name="name"
                    control={control}
                    label="Restaurant Name"
                    type="text"
                  />
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Email</Typography>
                  <FormInputText
                    name="email"
                    control={control}
                    label="Email"
                    type="email"
                  />
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Address</Typography>
                  <FormInputText
                    name="address"
                    control={control}
                    label="Address"
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
                  <Typography sx={labelStyle}>Phone</Typography>
                  <FormInputText
                    name="phone"
                    control={control}
                    label="Phone"
                    type="text"
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
                    <input
                      {...register("icon")}
                      name="icon"
                      type="file"
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
                    Choose File
                    <input
                      {...register("banner")}
                      name="banner"
                      type="file"
                      hidden
                    />
                  </Button>
                </Box>
              </form>
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

              <Button
                onClick={handleSubmit(onSubmit)}
                variant={"contained"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Add{" "}
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
