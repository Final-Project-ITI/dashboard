import { Box, Paper, Stack, Button, Typography, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../shared/formComponents/FormInputText";
import { FormInputDropdown } from "../../../shared/formComponents/FormInputDropDown";
import { FormInputFile } from "../../../shared/formComponents/FormInputFile";
import { useEffect } from "react";

interface IFormInput {
  itemName: string;
  price: number | null;
  image: string;
  category: string;
}

const defaultValues = {
  itemName: "",
  price: null,
  image: "",
  category: "",
};

export default function AddItemPopup({
  trigger,
  setTrigger,
  data,
  isAdd,
}: any) {
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
                  name="itemName"
                  control={control}
                  label="Item Name"
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
                <Typography sx={labelStyle}>Image</Typography>
                <FormInputFile name="image" control={control} label="EGP" />
              </Box>

              <Box>
                <Typography sx={labelStyle}>Category</Typography>
                <FormInputDropdown
                  name="category"
                  control={control}
                  label="Choose Category"
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
