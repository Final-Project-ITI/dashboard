import { Box, Stack, Button, Typography } from "@mui/material";
import { FormInputText } from "../../shared/formComponents/FormInputText";
import { FormInputDropdown } from "../../shared/formComponents/FormInputDropDown";
import { FormInputFile } from "../../shared/formComponents/FormInputFile";
import { useForm } from "react-hook-form";

interface IFormInput {
  restaurantName: string;
  email: string;
  address: string;
  description: string;
  phone: string;
  icon: string;
  banner: string;
}

const defaultValues = {
  restaurantName: "",
  email: "",
  address: "",
  description: "",
  phone: "",
  icon: "",
  banner: "",
};

export default function AddRestaurantPopup({ trigger, setTrigger }: any) {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);

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
            width={"35%"}
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
              <Box>
                <Typography sx={labelStyle}>Restaurant Name</Typography>
                <FormInputText
                  name="restaurantName"
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
                <FormInputFile name="icon" control={control} label="icon" />
              </Box>

              <Box>
                <Typography sx={labelStyle}>Banner</Typography>
                <FormInputFile name="banner" control={control} label="banner" />
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
