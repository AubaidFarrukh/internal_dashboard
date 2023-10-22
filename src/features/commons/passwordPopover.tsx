import { FC } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import type { SxProps, Theme } from "@mui/material";

export interface PasswordPopoverProps {
  password: string;
  sx?: SxProps<Theme>;
}

export const PasswordPopover: FC<PasswordPopoverProps> = ({ password, sx }) => {
  const conditions = [
    {
      id: "lower",
      name: "have atleast one lowercase.",
      fulfilled: Boolean(password.match(/[a-z]+/)),
    },
    {
      id: "upper",
      name: "have atleast one uppercase.",
      fulfilled: Boolean(password.match(/[A-Z]+/)),
    },
    {
      id: "number",
      name: "have atleast one number.",
      fulfilled: Boolean(password.match(/\d+/)),
    },
    {
      id: "symbol",
      name: "have atleast one symbol (!, @, #, $, %, &).",
      fulfilled: Boolean(password.match(/[!@#$%&]+/)),
    },
    {
      id: "length",
      name: "be atleast 8 characters long.",
      fulfilled: password.length >= 8,
    },
  ];

  return (
    <Paper sx={{ p: 1, mb: 2, bgcolor: "background.paper", ...sx }}>
      <Typography sx={{ px: 2, mt: 2 }}>Password must</Typography>
      <List>
        {conditions.map(c => (
          <ListItem disablePadding key={c.id}>
            <ListItemButton>
              <ListItemIcon>
                {c.fulfilled ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : (
                  <HighlightOffIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText>{c.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PasswordPopover;
