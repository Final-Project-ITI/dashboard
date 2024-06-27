import { Box, IconButton, Stack } from "@mui/material";

/* -------- */
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect } from "react";

export default function Pagination({
  handler,
  currentPage,
  setCurrentPage,
  pageSize,
  data,
  setItems,
}: any) {
  const handlePagination = async (direction: number) => {
    let page = currentPage;

    if (direction && currentPage == Math.ceil(data.length / pageSize)) return;
    if (!direction && currentPage == 1) return;

    setCurrentPage((pre: number) => {
      if (direction) {
        page++;
        return ++pre;
      } else {
        page--;
        return --pre;
      }
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setItems(data.slice(startIndex, endIndex));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <Stack width={"100%"} justifyContent={"center"} direction={"row"}>
      <Stack
        width={"120px"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton
          onClick={handler ? () => handler(0) : () => handlePagination(0)}
        >
          <ArrowBackIosNewIcon
            fontSize="small"
            sx={{
              color: currentPage == 1 ? "" : "black",
            }}
          />
        </IconButton>
        <Box
          sx={{
            width: "20px",
            height: "20px",
            color: currentPage == 1 ? "#E4002B" : "black",
            border: "solid 2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "2px",
            fontWeight: "bold",
          }}
        >
          {currentPage != 1 ? currentPage - 1 : 1}
        </Box>
        <Box
          sx={{
            width: "20px",
            height: "20px",
            color: currentPage == 1 ? "black" : "#E4002B",
            border: "solid 2px",
            display: Math.ceil(data?.length / pageSize) === 1 ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "2px",
            fontWeight: "bold",
          }}
        >
          {currentPage != 1 ? currentPage : 2}
        </Box>
        <IconButton
          onClick={handler ? () => handler(1) : () => handlePagination(1)}
        >
          <ArrowForwardIosIcon
            fontSize="small"
            sx={{
              color:
                currentPage == Math.ceil(data?.length / pageSize)
                  ? ""
                  : "black",
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
