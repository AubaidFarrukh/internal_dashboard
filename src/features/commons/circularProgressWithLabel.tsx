import type { FC } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  circularProgressClasses,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";

export interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
  fillColor?: string;
  isLoading?: boolean;
  labelFontSize?: string | number;
  labelFontWeight?: string | number;
  sx?: SxProps<Theme>;
}

export const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = ({
  value,
  fillColor,
  isLoading,
  labelFontSize,
  labelFontWeight,
  sx,
  ...props
}) => {
  const DEFAULT_FILL_COLOR = "#4dd475";

  return (
    <Box sx={{ position: "relative", display: "inline-flex", ...sx }}>
      <CircularProgress
        variant="determinate"
        sx={{ color: t => t.palette.grey[300] }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant={isLoading ? "indeterminate" : "determinate"}
        disableShrink={isLoading}
        sx={{
          position: "absolute",
          color: isLoading
            ? DEFAULT_FILL_COLOR
            : fillColor ?? DEFAULT_FILL_COLOR,
          left: 0,
          [`& .${circularProgressClasses.circle}`]: { strokeLinecap: "round" },
        }}
        size={40}
        thickness={4}
        {...props}
        value={isLoading ? 70 : value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <></>
        ) : (
          <Typography
            component="div"
            fontSize={labelFontSize ?? "1rem"}
            fontWeight={labelFontWeight}
          >{`${Math.round(value)}%`}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
