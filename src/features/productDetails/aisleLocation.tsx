import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { IsEditing } from "./isEditing";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectEditingMode,
  selectAisleLocation,
  setAisleLocation as setAisleLocationAction,
} from "./productDetailsSlice";
import type { FC } from "react";
import type { SelectProps } from "@mui/material";
import type { TAisleLocation } from "../../types/products";

interface AisleLocationProps {
  location: TAisleLocation;
}

export const AisleLocation: FC<AisleLocationProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const isEditingMode = useAppSelector(selectEditingMode);
  const aisleLocationState = useAppSelector(selectAisleLocation);

  const setAisleLocation: SelectProps["onChange"] = e => {
    const selectedOption = e.target.value as TAisleLocationOption["value"];
    const aisleLocation = selectedOption === 0 ? null : selectedOption;
    dispatch(setAisleLocationAction({ aisleLocation }));
  };

  let aisleLocationOptions: TAisleLocationOption[] = [];
  if (isEditingMode) {
    for (let index = 1; index <= 25; index++) {
      aisleLocationOptions.push({
        id: index.toString(),
        label: index.toString(),
        value: index,
      });
    }
  }

  return (
    <Paper square sx={{ p: 3 }}>
      <Box display="flex" alignItems="start">
        <Typography variant="h5" component="h2" fontWeight={600} mr="auto">
          Aisle Location
        </Typography>
        {isEditingMode ? <IsEditing sx={{ ml: "auto" }} /> : null}
      </Box>
      {!isEditingMode ? (
        <Typography mt={1}>{location ?? "-----"}</Typography>
      ) : (
        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
          <InputLabel id="update-aisle-location">Location</InputLabel>
          <Select
            labelId="update-aisle-location"
            value={aisleLocationState ?? ""}
            onChange={setAisleLocation}
            fullWidth
            size="small"
          >
            {aisleLocationOptions.map(option => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Paper>
  );
};

export default AisleLocation;

type TAisleLocationOption = {
  id: string;
  label: string;
  value: NonNullable<TAisleLocation>;
};
