import { FC, useRef, useState } from "react";
import { Box } from "@mui/material";
import CropIcon from "@mui/icons-material/Crop";
import CloseIcon from "@mui/icons-material/Close";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CustomModal } from "./customModal";
import { cropImage } from "../../utils";

export interface ImageCropperModalProps {
  isVisible: boolean;
  changeVisibility: (v: boolean) => void;
  image: File | null;
  onCrop: (croppedImage: string | null) => Promise<void>;
}

export const ImageCropperModal: FC<ImageCropperModalProps> = ({
  isVisible,
  changeVisibility,
  onCrop,
  image,
}) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    x: 25,
    y: 25,
    unit: "px",
    width: 100,
    height: 100,
  });

  const handleCancelImage = () => {
    changeVisibility(false);
  };

  const handleCroppingImage = async () => {
    await onCrop(cropImage(cropperRef, crop) ?? null);
    changeVisibility(false);
  };

  return (
    <CustomModal
      open={isVisible}
      title="Crop Image"
      confirmText="Crop"
      confirmIcon={<CropIcon />}
      cancelIcon={<CloseIcon />}
      disabled={!image}
      handleConfirmation={handleCroppingImage}
      handleCancel={handleCancelImage}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <ReactCrop crop={crop} onChange={c => setCrop(c)} aspect={1}>
          <img
            src={image ? URL.createObjectURL(image) : undefined}
            height={200}
            ref={cropperRef}
            alt="Not found"
            style={{ pointerEvents: "none" }}
          />
        </ReactCrop>
      </Box>
    </CustomModal>
  );
};

export default ImageCropperModal;
