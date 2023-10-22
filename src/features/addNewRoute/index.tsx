import { FC } from "react";
import { Box } from "@mui/material";
import { SaveRouteButton } from "./saveRouteButton";
import { BackBtn } from "../commons";
import { RouteForm } from "../routeForm";

export const AddNewRoutePage: FC = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <BackBtn path="/delivery-and-dispatch" />
        <SaveRouteButton />
      </Box>
      <RouteForm />
    </>
  );
};

export default AddNewRoutePage;
