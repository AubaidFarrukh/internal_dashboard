import { Fade } from "@mui/material";
import type { FC, ReactElement } from "react";
import type { SxProps, Theme } from "@mui/material";
import { LightTooltip } from "../commons";

export interface CustomTooltipProps {
  title: string;
  disableTooltip?: boolean;
  children: ReactElement;
  sx?: SxProps<Theme>;
}

export const CustomTooltip: FC<CustomTooltipProps> = ({
  title,
  disableTooltip,
  children,
  sx,
}) => {
  return (
    <LightTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={title}
      disableFocusListener={disableTooltip}
      disableHoverListener={disableTooltip}
      disableInteractive={disableTooltip}
      disableTouchListener={disableTooltip}
      sx={sx}
    >
      <div style={{ cursor: title ? "pointer" : undefined }}>{children}</div>
    </LightTooltip>
  );
};

export default CustomTooltip;
