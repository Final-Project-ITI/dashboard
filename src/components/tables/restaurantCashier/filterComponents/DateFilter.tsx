import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function DateFilter({ label }: { label: string }) {
  const [val, setVal] = useState<any>();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        sx={{
          borderRadius: "10px",
          border: "solid 1px #D74339",
          backgroundColor: "#F3ECE4",
          marginBottom: "16px",
        }}
        value={val}
        onChange={(date: any) => {
          console.log(date.format("YYYY-MM-DD"));
        }}
      />
    </LocalizationProvider>
  );
}
