import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import icon from "../../../assets/logo.svg";
import ExitSVG from "../../../assets/svgs/ExitSVG";

export default function OrderDetailsPopup({ trigger, setTrigger }: any) {
  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
  };

  const tableHeaderStyle = {
    fontSize: "20px",
    color: "#D7433980",
    textAlign: "center",
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
            }}
          >
            <Box>
              <IconButton
                onClick={() => {
                  setTrigger(false);
                }}
              >
                <ExitSVG></ExitSVG>
              </IconButton>
            </Box>
            <Stack
              sx={{
                padding: "0 16px",
              }}
            >
              <Typography sx={headerStyle}>User Info</Typography>
              <Stack spacing={"8px"} padding={"0 0 10px 52px"}>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  alignItems={"flex-end"}
                >
                  <Typography sx={tableHeaderStyle}>Name:</Typography>
                  <Typography>Hamada</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  alignItems={"flex-end"}
                >
                  <Typography sx={tableHeaderStyle}>E-Mail:</Typography>
                  <Typography>waleed.almenawy@oulook.com</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  alignItems={"flex-end"}
                >
                  <Typography sx={tableHeaderStyle}>Phone:</Typography>
                  <Typography>01503852538</Typography>
                </Stack>
              </Stack>
              <Typography sx={headerStyle}>Order Details</Typography>
              <Stack justifyContent={"space-between"} height={"85%"}>
                <TableContainer
                  sx={{
                    maxHeight: "300px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <Table stickyHeader>
                    <TableHead
                      sx={{
                        backgroundColor: "#F3ECE4",
                      }}
                    >
                      <TableCell
                        sx={{ ...tableHeaderStyle, textAlign: "flex-start" }}
                      >
                        Item
                      </TableCell>
                      <TableCell sx={tableHeaderStyle}>Qty</TableCell>
                      <TableCell sx={tableHeaderStyle}>Price</TableCell>
                      <TableCell sx={tableHeaderStyle}>Total</TableCell>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={"30px"}
                          >
                            <img
                              src={icon}
                              title="icon"
                              style={{
                                objectFit: "cover",
                                width: "60px",
                                height: "60px",
                              }}
                            />
                            <Typography>Margherita pizza</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography textAlign={"center"}>2</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 120</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 240</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={"30px"}
                          >
                            <img
                              src={icon}
                              title="icon"
                              style={{
                                objectFit: "cover",
                                width: "60px",
                                height: "60px",
                              }}
                            />
                            <Typography>Margherita pizza</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography textAlign={"center"}>2</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 120</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 240</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={"30px"}
                          >
                            <img
                              src={icon}
                              title="icon"
                              style={{
                                objectFit: "cover",
                                width: "60px",
                                height: "60px",
                              }}
                            />
                            <Typography>Margherita pizza</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography textAlign={"center"}>2</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 120</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 240</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={"30px"}
                          >
                            <img
                              src={icon}
                              title="icon"
                              style={{
                                objectFit: "cover",
                                width: "60px",
                                height: "60px",
                              }}
                            />
                            <Typography>Margherita pizza</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography textAlign={"center"}>2</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 120</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 240</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={"30px"}
                          >
                            <img
                              src={icon}
                              title="icon"
                              style={{
                                objectFit: "cover",
                                width: "60px",
                                height: "60px",
                              }}
                            />
                            <Typography>Margherita pizza</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography textAlign={"center"}>2</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 120</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography textAlign={"center"}>EGP 240</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  padding={"30px"}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography>EGP 440</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
