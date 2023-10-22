import { FC } from "react";
import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./backIcon";

interface BackBtnProps {
  path?: string;
}

export const BackBtn: FC<BackBtnProps> = ({ path }) => {
  const navigateTo = useNavigate();

  return (
    <Box>
      <Link
        href={path}
        onClick={e => {
          e.preventDefault();
          path ? navigateTo(path) : navigateTo(-1);
        }}
        sx={{ cursor: "pointer" }}
      >
        <BackIcon />
      </Link>
    </Box>
  );
};

export default BackBtn;
