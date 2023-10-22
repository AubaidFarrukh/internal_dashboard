import { Typography } from "@mui/material";
import type { FC } from "react";
import type { TypographyProps } from "@mui/material";

export interface TextRendererProps extends TypographyProps {
  children: string | string[];
  maxLines?: number;
}

export const DEFAULT_MAX_NUM_LINES: TextRendererProps["maxLines"] = 1;

export const TextRenderer: FC<TextRendererProps> = ({
  children,
  maxLines = DEFAULT_MAX_NUM_LINES,
  sx,
  ...props
}) => (
  <Typography
    {...props}
    sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: maxLines,
      lineClamp: maxLines,
      WebkitBoxOrient: "vertical",
      ...sx,
    }}
  >
    {children}
  </Typography>
);

export default TextRenderer;
