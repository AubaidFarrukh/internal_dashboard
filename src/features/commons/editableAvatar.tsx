import { FC } from "react";
import { Avatar, Badge, Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export interface EditableAvatarProps {
  image: string | null;
  editIconVisible?: boolean;
  onEditClick?: () => void;
  title?: string;
  alt?: string;
  sx?: SxProps<Theme>;
}

export const EditableAvatar: FC<EditableAvatarProps> = ({
  image,
  editIconVisible,
  onEditClick,
  title,
  alt,
  sx,
}) => {
  const showCropModal = () => onEditClick?.();

  return (
    <Box sx={{ "& .badge": { height: 20, width: 20, cursor: "pointer" } }}>
      <Badge
        color="primary"
        badgeContent={
          <EditIcon onClick={showCropModal} sx={{ fontSize: 14 }} />
        }
        invisible={!editIconVisible}
        overlap="circular"
        classes={{ badge: "badge" }}
      >
        <Avatar
          src={image ?? undefined}
          title={title}
          alt={alt}
          sx={{ width: 70, height: 70, mx: "auto", ...sx }}
        />
      </Badge>
    </Box>
  );
};

export default EditableAvatar;
