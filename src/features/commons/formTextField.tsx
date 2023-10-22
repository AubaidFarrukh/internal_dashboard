import { FC } from "react";
import { useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

export const FormTextField: FC<TextFieldProps> = props => {
  const [field, meta] = useField({
    name: props.name ?? "",
    type: props.type ?? "text",
  });
  return (
    <TextField
      required
      {...field}
      {...props}
      variant={props.variant ?? "outlined"}
      error={!!meta.error && meta.touched}
      helperText={!!meta.error && meta.touched ? meta.error : null}
    />
  );
};

export default FormTextField;
