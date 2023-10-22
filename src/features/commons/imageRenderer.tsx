import { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { Image } from "mui-image";

interface ImageRendererProps {
  src?: string | null;
  title?: string | null;
  alt?: string | null;
  height: number;
  overlay?: FC<object>;
  sx?: SxProps<Theme>;
}

export const ImageRenderer: FC<ImageRendererProps> = ({
  src,
  title,
  alt,
  height,
  overlay: Overlay,
  sx,
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width={`${height}px`}
    height={`${height}px`}
    sx={{ position: "relative", ...sx }}
  >
    {src && (
      <Image
        src={src}
        alt={alt ?? ""}
        title={title ?? ""}
        height={`${height}px`}
        showLoading
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        duration={2000}
      />
    )}
    <Box
      width={`${height}px`}
      height={`${height}px`}
      sx={{ position: "absolute" }}
    >
      {Overlay ? <Overlay /> : null}
    </Box>
  </Box>
);

export default ImageRenderer;
