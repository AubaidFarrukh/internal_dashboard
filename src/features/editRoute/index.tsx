import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { SaveChangesButton } from "./saveChangesButton";
import { BackBtn } from "../commons";
import { RouteForm } from "../routeForm";
import type { TPreloadPayload as TPreloadRoutePayload } from "../../types/routeFormSlice";

export const EditRoutePage: FC = () => {
  const { state } = useLocation();
  const route = state.route as TPreloadRoutePayload;
  console.log(route);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <BackBtn path="/delivery-and-dispatch" />
        <SaveChangesButton routeId={route.id} />
      </Box>
      <RouteForm values={route} />
    </>
  );
};

export default EditRoutePage;
