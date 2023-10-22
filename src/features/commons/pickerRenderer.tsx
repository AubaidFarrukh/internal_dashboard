import { useRef, useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface PickerRendererProps {
  firstName: string;
  lastName: string;
  profilePicture: string;
  sx?: SxProps<Theme>;
}

export const PickerRenderer: FC<PickerRendererProps> = ({
  firstName,
  lastName,
  profilePicture,
  sx,
}) => {
  const name = `${firstName} ${lastName}`;
  const nameDiv = useRef<HTMLSpanElement | null>(null);
  const [nameWidth, setNameWidth] = useState<number | null>(null);

  useEffect(() => {
    setNameWidth(nameDiv.current?.clientWidth ?? null);
  }, [setNameWidth]);

  return (
    <Box display="flex" alignItems="center" sx={sx}>
      <Avatar src={profilePicture} sx={{ mr: 1 }} />
      <Box display="flex" flexDirection="column" ref={nameDiv}>
        {nameWidth && nameWidth > 128 ? (
          <>
            <Typography lineHeight={1.2}>{firstName}</Typography>
            <Typography lineHeight={1.2}>{lastName}</Typography>
          </>
        ) : (
          <Typography>{name}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PickerRenderer;
