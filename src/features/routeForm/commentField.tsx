import { FC } from "react";
import {
  Box,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectComment, selectRouteStatus, setComment } from "./routeFormSlice";

export interface CommentFieldProps {
  sx?: SxProps<Theme>;
}

export const CommentField: FC<CommentFieldProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector(selectComment);
  const routeStatus = useAppSelector(selectRouteStatus);

  const updateComment: TextFieldProps["onChange"] = e => {
    dispatch(setComment({ comment: e.target.value }));
  };

  return (
    <Box sx={sx}>
      <Typography mb={1}>Comments (Optional):</Typography>
      <TextField
        name="comment"
        label=""
        value={comment}
        onChange={updateComment}
        disabled={routeStatus === "Loading"}
        fullWidth
        multiline
        rows={5}
      />
    </Box>
  );
};

export default CommentField;
