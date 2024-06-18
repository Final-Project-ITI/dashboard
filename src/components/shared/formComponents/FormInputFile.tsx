// import { Button } from "@mui/material";
// import { useState } from "react";

// export default function FormInputFile({ register, name, control }: any) {
//   const handlOnChange = (e: any) => {
//     if (!e.target.files[0].name) setLabel("Choose File");
//     else setLabel(e.target.files[0].name);
//   };

//   const [label, setLabel] = useState("Choose File");
//   return (

//      <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value = "" }, fieldState: { error } }) => (
//         <TextField
//           sx={{
//             backgroundColor: "#E8DCCC",
//           }}
//           helperText={error ? error.message : null}
//           size="small"
//           error={!!error}
//           onChange={onChange}
//           value={value}
//           fullWidth
//           label={label}
//           inputProps={{ type }}
//           name={name}
//         />
//       )}
//     />
//     <Button variant="contained" component="label" fullWidth color="secondary">
//       {label}
//       <input
//         {...register(name)}
//         name={name}
//         type="file"
//         onChange={handlOnChange}
//         accept="image/png, image/gif, image/jpeg"
//         hidden
//       />
//     </Button>
//   );
// }
