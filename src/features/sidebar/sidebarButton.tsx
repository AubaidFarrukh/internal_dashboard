import { FC } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { SxProps, Theme } from "@mui/material";

export interface SidebarButtonProps {
  label: string;
  Icon?: FC<{ color?: string }>;
  isActive: boolean;
  hasChildren: boolean;
  isOpen?: boolean;
  showLabel?: boolean;
  onClick: () => void;
  sx?: SxProps<Theme>;
}

export const SidebarButton: FC<SidebarButtonProps> = ({
  label,
  Icon,
  isActive,
  hasChildren,
  isOpen,
  showLabel = true,
  onClick,
  sx,
}) => {
  return (
    <ListItem
      onClick={onClick}
      sx={{
        p: 0,
        borderRadius: "5px",
        bgcolor: t => (isActive ? t.palette.primary.main : "transparent"),
        color: t => (isActive ? "white" : t.palette.text.primary),
        "&:hover": {
          bgcolor: t => (isActive ? t.palette.primary.dark : undefined),
        },
        ...sx,
      }}
    >
      <ListItemButton
        sx={{
          px: 2,
          py: 0.75,
          justifyContent: showLabel ? "initial" : "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 25,
            mr: showLabel ? 1 : "auto",
            justifyContent: "center",
          }}
        >
          {Icon ? <Icon color={isActive ? "#fff" : undefined} /> : null}
        </ListItemIcon>
        <ListItemText sx={{ m: 0 }}>{showLabel ? label : ""}</ListItemText>
        {hasChildren && showLabel ? (
          isOpen ? (
            <KeyboardArrowDownIcon sx={{ ml: 1 }} />
          ) : (
            <KeyboardArrowRightIcon sx={{ ml: 1 }} />
          )
        ) : null}
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarButton;
