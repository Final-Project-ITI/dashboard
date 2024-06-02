import { Box, Stack, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../formComponents/FormInputText";

interface IFormInput {
  name: string;
  email: number | null;
  password: string;
}

const defaultValues = {
  name: "",
  email: null,
  password: "",
};

export default function AddCashier({ trigger, setTrigger }: any) {
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
              Add Item
            </Typography>
            <Stack spacing={"8px"}>
              <Box>
                <Typography sx={labelStyle}>Cashier Name</Typography>
                <FormInputText
                  name="name"
                  control={control}
                  label="Add Cashier Name"
                  type="text"
                />
              </Box>
              <Box>
                <Typography sx={labelStyle}>E-Mail</Typography>
                <FormInputText
                  name="email"
                  control={control}
                  label="E-Mail"
                  type="email"
                />
              </Box>
              <Box>
                <Typography sx={labelStyle}>Password</Typography>
                <FormInputText
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
