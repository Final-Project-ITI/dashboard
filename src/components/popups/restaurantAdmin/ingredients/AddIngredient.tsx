import { Box, Paper, Stack, Button, Typography, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../shared/formComponents/FormInputText";
import { useEffect } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { INGREDIENT_URL } from "../../../../utils/URLs";

interface IFormInput {
  name: string;
}

const defaultValues = {
  name: "",
};

export default function AddIngredient({
  trigger,
  setTrigger,
  isAdd,
  ingredient,
}: any) {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: IFormInput) => {
    let res: any;

    if (isAdd) res = await axiosPrivate.post(INGREDIENT_URL, data);
    else {
      res = await axiosPrivate.patch(
        INGREDIENT_URL + "/" + ingredient?._id,
        data
      );
    }
  };

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
                <Typography sx={labelStyle}>ingredient</Typography>
                <FormInputText
                  name="name"
                  control={control}
                  label="Ingredient"
                  type="text"
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
