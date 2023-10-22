import { FC, useState } from "react";
import { Box, Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import {
  EditableAvatar,
  FileInput,
  FileInputProps,
  ImageCropperModal,
} from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import { selectProfilePicture, setProfilePicture } from "./createUserSlice";

export interface UploadImageProps {
  sx?: SxProps<Theme>;
}

export const UploadImage: FC<UploadImageProps> = ({ sx }) => {
  const croppedImage = useAppSelector(selectProfilePicture);
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);

  const allowedFileTypes = "image/png, image/jpeg, image/jpg";

  const setCroppedImage = (c: string | null) => {
    dispatch(setProfilePicture({ profilePicture: c }));
  };
  const showCropModal = () => setIsCropModalVisible(true);
  const hideCropModal = () => setIsCropModalVisible(false);

  const handleImageChange: FileInputProps["onChange"] = image => {
    setSelectedImage(image);
    showCropModal();
  };

  const onCrop = async (croppedImage: string | null) => {
    setCroppedImage(croppedImage);
    hideCropModal();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ ml: -0.8, ...sx }}
    >
      <EditableAvatar
        image={croppedImage}
        editIconVisible={!!croppedImage}
        onEditClick={showCropModal}
        alt="Not found"
      />
      <Button
        disableRipple
        component="label"
        sx={{
          textTransform: "none",
          ":hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        Upload Image
        <FileInput
          onChange={handleImageChange}
          allowedFileTypes={allowedFileTypes}
        />
      </Button>
      <ImageCropperModal
        isVisible={isCropModalVisible}
        changeVisibility={setIsCropModalVisible}
        image={selectedImage}
        onCrop={onCrop}
      />
    </Box>
  );
};

export default UploadImage;
