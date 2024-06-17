import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

/* -------- */
import { INGREDIENT_URL } from "../../../../utils/urls";
import { IFormInputIngredient } from "../../../../models/formInputs/formInputIngredient.model";
import { DVIngredient } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddIngredient({
  trigger,
  setTrigger,
  isAdd,
  ingredient,
}: any) {
  const methods = useForm<IFormInputIngredient>({
    defaultValues: DVIngredient,
  });
  const { handleSubmit, reset, control, setValue } = methods;

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: IFormInputIngredient) => {
    let res: any;

    if (isAdd) res = await axiosPrivate.post(INGREDIENT_URL, data);
    else {
      res = await axiosPrivate.patch(
        INGREDIENT_URL + "/" + ingredient?._id,
        data
      );
    }

    setValue("name", "");
    setTrigger(false);
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
