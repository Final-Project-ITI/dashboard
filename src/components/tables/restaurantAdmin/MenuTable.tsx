import { useState } from "react";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";

import AddItemPopup from "../../popups/restaurantAdmin/menu/AddItemPopup";
import DeleteItemPopup from "../../popups/restaurantAdmin/menu/DeleteItemPopup";

import icon from "../../../assets/logo.svg";
import MainButton from "../../shared/MainButton";
import PinSVG from "../../../assets/svgs/PinSVG";
import TrashSVG from "../../../assets/svgs/TrashSVG";

export default function MenuTable() {
  const [addItemTrigger, setAddItemTrigger] = useState(false);
  const [deleteItemTrigger, setDeleteItemTrigger] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

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
    <>
      <Stack
        height={"100%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          marginBlock={"10px"}
          justifyContent={"space-between"}
          width={"85%"}
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
              setIsAdd(true);
              setAddItemTrigger(true);
            }}
            state={true}
          ></MainButton>
        </Stack>

        <Stack>
          <AddItemPopup
            trigger={addItemTrigger}
            setTrigger={setAddItemTrigger}
            isAdd={isAdd}
          />
          <DeleteItemPopup
            trigger={deleteItemTrigger}
            setTrigger={setDeleteItemTrigger}
          />
          <Box
            sx={{
              width: { xl: "1000px", md: "850px", xs: "450px" },
              height: "600px",
              backgroundColor: "#E8DCCC",
              borderRadius: "15px",
            }}
            marginBottom={{ xl: 0, md: "20px", xs: "30px" }}
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
                  <TableCell
                    sx={{
                      ...tableBodyTextStyle,
                      display: { md: "table-cell", xs: "none" },
                    }}
                  >
                    Icon
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableHeadTextStyle,
                      textAlign: "start",
                      display: { md: "table-cell", xs: "none" },
                    }}
                  >
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
                    <TableCell
                      sx={{
                        ...tableBodyTextStyle,
                        display: { md: "table-cell", xs: "none" },
                      }}
                    >
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
                        display: { md: "table-cell", xs: "none" },
                      }}
                    >
                      fresh tomato sauce mozzarella cheese touch of basil
                    </TableCell>
                    <TableCell sx={tableBodyTextStyle}>EGP120</TableCell>
                    <TableCell sx={tableBodyTextStyle}>
                      <IconButton
                        onClick={() => {
                          setIsAdd(false);
                          setAddItemTrigger(true);
                        }}
                      >
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
    </>
  );
}
