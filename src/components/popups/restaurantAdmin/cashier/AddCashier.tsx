import { Box, Stack, Button, Typography } from "@mui/material";

/* -------- */
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

/* -------- */
import { REGISTER_CASHIER_URL } from "../../../../utils/urls";
import { DVAddCashier } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddCashier({ trigger, setTrigger }: any) {
  const methods = useForm<IFormInputCashier>({ defaultValues: DVAddCashier });
  const { handleSubmit, reset, control } = methods;
  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: IFormInputCashier) => {
    await axiosPrivate.post(REGISTER_CASHIER_URL, data);
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
              Add Item
            </Typography>
            <Stack spacing={"8px"}>
              <Box>
                <Typography sx={labelStyle}>Cashier Name</Typography>
                <FormInputText
                  name="fullName"
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
