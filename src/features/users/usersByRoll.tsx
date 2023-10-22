import { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  Typography,
} from "@mui/material";
import type { AccordionProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserListItem } from "./userListItem";
import type { TUser } from "../../types/users";

interface UsersByRollProps {
  header: string;
  users: TUser[];
  expanded?: boolean;
  onChange?: AccordionProps["onChange"];
}

export const UsersByRoll: FC<UsersByRollProps> = ({
  header,
  users,
  expanded,
  onChange,
}) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>
          {header} ({users.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Divider variant="fullWidth" />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {users.map(user => (
            <UserListItem user={user} key={user.username} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default UsersByRoll;
