import { FC, useState } from "react";
import dayjs from "dayjs";
import { Box, Button, SxProps, TextField, Theme } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectSendDate,
  selectRouteStatus,
  selectFormType,
  setSendDate,
} from "./routeFormSlice";

const dateToday = dayjs();

export interface SendDateFieldProps {
  sx?: SxProps<Theme>;
}

export const SendDateField: FC<SendDateFieldProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const sendDate = useAppSelector(selectSendDate);
  const routeStatus = useAppSelector(selectRouteStatus);
  const formType = useAppSelector(selectFormType);

  const [openCalender, setOpenCalender] = useState(false);
  const minDate = formType === "create" ? dateToday : dayjs(sendDate);
  const maxDate = minDate.add(1, "week");

  const updateSendDate = (date: dayjs.Dayjs | null) => {
    dispatch(
      setSendDate({ sendDate: (date ?? dateToday).format("YYYY/MM/DD") })
    );
  };

  const calenderButton = (
    <Button
      onClick={() => setOpenCalender(true)}
      color="primary"
      variant="contained"
      disabled={routeStatus === "Loading"}
      sx={{
        position: "absolute",
        right: 0,
        zIndex: 999,
        minWidth: "fit-content",
        height: "100%",
        px: 1,
        borderRadius: 0,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      }}
    >
      <DateRangeIcon />
    </Button>
  );

  return (
    <Box minWidth={160}>
      <DatePicker
        value={dayjs(new Date(sendDate))}
        inputFormat="DD/MM/YYYY"
        minDate={minDate}
        maxDate={maxDate}
        open={openCalender}
        onClose={() => setOpenCalender(false)}
        onChange={date => updateSendDate(date)}
        renderInput={props => (
          <TextField
            {...props}
            size="small"
            InputProps={{
              ...props.InputProps,
              endAdornment: calenderButton,
            }}
            required
            fullWidth
            disabled
            sx={{
              ...(props.sx as any),
              position: "relative",
              "& > div": { pr: 0 },
              ...sx,
            }}
          />
        )}
      />
    </Box>
  );
};

export default SendDateField;
