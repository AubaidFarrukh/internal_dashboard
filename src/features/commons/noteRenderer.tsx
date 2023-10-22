import type { FC, ReactNode } from "react";
import { Box, Fade, SxProps, Theme } from "@mui/material";
import { LightTooltip } from "./lightToolTip";

interface NoteRendererProps {
  note?: ReactNode;
  disableTooltip?: boolean;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const NoteRenderer: FC<NoteRendererProps> = ({
  note,
  disableTooltip,
  children,
  sx,
}) => {
  return (
    <LightTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={note ?? " "}
      disableFocusListener={disableTooltip}
      disableHoverListener={disableTooltip}
      disableInteractive={disableTooltip}
      disableTouchListener={disableTooltip}
    >
      <Box
        sx={{
          width: "100%",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          ...sx,
        }}
      >
        {children}
      </Box>
    </LightTooltip>
  );
};

export default NoteRenderer;
