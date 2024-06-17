import { Box, Button, Stack, Typography } from "@mui/material";

/* -------- */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

/* -------- */
import { MENU_CATEGORY_URL } from "../../../../utils/urls";
import { DVCategory } from "../../../../utils/defaultValues";

/* -------- */
import { FormInputText } from "../../../shared/formComponents/FormInputText";

export default function AddCategory({
  trigger,
  setTrigger,
  isAdd,
  menuCategory,
}: any) {
  const methods = useForm<IFormInputCategory>({ defaultValues: DVCategory });
  const { handleSubmit, reset, control, setValue, register } = methods;
  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data: IFormInputCategory) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("icon", data.icon[0]);

    if (isAdd) await axiosPrivate.post(MENU_CATEGORY_URL, formData);
    else {
      await axiosPrivate.patch(
        MENU_CATEGORY_URL + "/" + menuCategory?._id,
        formData
      );
    }

    setValue("name", "");
    setValue("icon", "");
    setTrigger(false);
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
  };

  useEffect(() => {
    if (!isAdd) {
      setValue("name", menuCategory?.name);
    }
  }, [menuCategory]);

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
              Categories
            </Typography>
            <Stack spacing={"8px"}>
              <form>
                <Box>
                  <Typography sx={labelStyle}>Category</Typography>
                  <FormInputText
                    name="name"
                    control={control}
                    label="Category"
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
