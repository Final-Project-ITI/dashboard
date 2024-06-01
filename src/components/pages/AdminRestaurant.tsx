import Table from "@mui/material/Table";
import {
  Box,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import icon from "../../assets/logo.svg";
import MainButton from "../shared/MainButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";

import MenuSVG from "../../assets/svgs/MenuSVG";
import PersonSVG from "../../assets/svgs/PersonSVG";
import TomatoSVG from "../../assets/svgs/TomatoSVG";
import CategorySVG from "../../assets/svgs/CategorySVG";
import TrashSVG from "../../assets/svgs/TrashSVG";
import PinSVG from "../../assets/svgs/PinSVG";
import AddItemPopup from "../popups/restaurantAdmin/menu/AddItemPopup";
import { useState } from "react";
import DeleteItemPopup from "../popups/restaurantAdmin/menu/DeleteItemPopup";

export default function AdminRestaurant() {
  const [addItemTrigger, setAddItemTrigger] = useState(false);
  const [deleteItemTrigger, setDeleteItemTrigger] = useState(false);

  const tableHeadTextStyle = {
    textAlign: "center",
    color: "#0A0A0A80",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "none",
  };

  const tableBodyTextStyle = {
    textAlign: "center",
    fontSize: "16px",
    borderBottom: "none",
  };

  const handleDeleteItem = () => {
    setDeleteItemTrigger(true);
  };

  return (
    <Stack height={"100vh"} direction={"row"}>
      <AddItemPopup trigger={addItemTrigger} setTrigger={setAddItemTrigger} />
      <DeleteItemPopup
        trigger={deleteItemTrigger}
        setTrigger={setDeleteItemTrigger}
      />
      <Stack
        sx={{
          backgroundColor: "#E8DCCC",
          width: "18%",
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            marginTop: "80px",
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            User Name
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#0A0A0A80",
              marginBottom: "80px",
            }}
          >
            Restaurant Name
          </Typography>

          <Stack
            spacing={"16px"}
            sx={{
              marginBottom: "50%",
            }}
          >
            <MainButton
              width={"100%"}
              text={"Menu"}
              Icon={MenuSVG}
            ></MainButton>
            <MainButton
              width={"100%"}
              text={"Cashier"}
              Icon={PersonSVG}
            ></MainButton>
            <MainButton
              width={"100%"}
              text={"Ingredients"}
              Icon={TomatoSVG}
            ></MainButton>
            <MainButton
              width={"100%"}
              text={"Categories"}
              Icon={CategorySVG}
            ></MainButton>
          </Stack>

          <Stack spacing={"32px"} alignItems={"center"}>
            <MainButton width={"100%"} text={"Log Out"}></MainButton>

            <img
              src={icon}
              title="logo"
              style={{
                objectFit: "cover",
                width: "80px",
                height: "80px",
              }}
            />
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          backgroundColor: "#F3ECE4",
          width: "85%",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          position={"absolute"}
          width={"56%"}
          top={"4%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Menu
          </Typography>

          <MainButton
            width={"156px"}
            text={"Add item"}
            Icon={AddIcon}
            handler={() => {
              setAddItemTrigger(true);
            }}
          ></MainButton>
        </Stack>

        <Stack>
          <Box
            sx={{
              width: "1000px",
              height: "600px",
              backgroundColor: "#E8DCCC",
              borderRadius: "15px",
            }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "30px",
                marginLeft: "40px",
              }}
            >
              List Menu
            </Typography>

            <Stack justifyContent={"space-between"} height={"85%"}>
              <Table>
                <TableHead>
                  <TableCell sx={tableHeadTextStyle}>Item Name</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Icon</TableCell>
                  <TableCell sx={{ ...tableHeadTextStyle, textAlign: "start" }}>
                    Ingredients
                  </TableCell>
                  <TableCell sx={tableHeadTextStyle}>Price</TableCell>
                  <TableCell sx={tableHeadTextStyle}>Action</TableCell>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell sx={tableBodyTextStyle}>
                      Margherita pizza
                    </TableCell>
                    <TableCell sx={tableBodyTextStyle}>
                      <img
                        src={icon}
                        title="icon"
                        style={{
                          objectFit: "cover",
                          width: "64px",
                          height: "64px",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        ...tableBodyTextStyle,
                        width: "200px",
                        textAlign: "start",
                      }}
                    >
                      fresh tomato sauce mozzarella cheese touch of basil
                    </TableCell>
                    <TableCell sx={tableBodyTextStyle}>EGP120</TableCell>
                    <TableCell sx={tableBodyTextStyle}>
                      <IconButton>
                        <PinSVG />
                      </IconButton>

                      <IconButton onClick={() => handleDeleteItem()}>
                        <TrashSVG />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Stack width={"100%"} justifyContent={"center"} direction={"row"}>
                <Stack
                  width={"120px"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <IconButton>
                    <ArrowBackIosNewIcon
                      fontSize="small"
                      sx={{
                        color: "black",
                      }}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: "black",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </Box>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      color: "#E4002B",
                      border: "solid 2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Box>
                  <IconButton>
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            <Stack></Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
