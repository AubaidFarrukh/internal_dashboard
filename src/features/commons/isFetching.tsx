import { FC } from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

interface IsFetchingProps {
  loading: boolean;
  sx?: SxProps<Theme>;
}

export const IsFetching: FC<IsFetchingProps> = ({ loading, sx }) => {
  if (!loading) return <></>;

  return (
    <Box sx={sx}>
      <CircularProgress />
    </Box>
  );
};

export default IsFetching;
