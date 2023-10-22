import { FC } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ImageRenderer } from "../commons";

interface ProductImageProps {
  src: string | null;
  alt: string | null;
  height: number;
}

export const ProductImage: FC<ProductImageProps> = ({ src, alt, height }) => {
  const theme = useTheme();

  return (
    <Box px={5} py={4} display="flex" flexDirection="column">
      <Typography variant="h5" component="h2" fontWeight={600} mb={2}>
        Product Image
      </Typography>
      <ImageRenderer
        src={src}
        alt={alt}
        title={alt}
        height={height}
        sx={{
          border: `solid 1px ${theme.palette.grey[300]}`,
          borderRadius: 1,
          overflow: "hidden",
          m: "auto",
        }}
      />
    </Box>
  );
};

export default ProductImage;
