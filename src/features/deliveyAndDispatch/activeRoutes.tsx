import { FC } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { RoutesTable } from "./routesTable";
import { useGetAllActiveRoutesQuery } from "../../services/api";

export interface ActiveRoutesProps {
  sx?: SxProps<Theme>;
}

export const ActiveRoutes: FC<ActiveRoutesProps> = ({ sx }) => {
  const navigateTo = useNavigate();
  const { data, isFetching } = useGetAllActiveRoutesQuery({});
  const todayRoutes = data?.activeRoutes.today ?? [];
  const tomorrowRoutes = data?.activeRoutes.tomorrow ?? [];
  const futureRoutes = data?.activeRoutes.future ?? [];

  return (
    <Box
      sx={{ border: 1, borderColor: "divider", bgcolor: "white", pb: 7, ...sx }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          p: theme => theme.spacing(2, 3),
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Active Routes
        </Typography>
        <Button
          onClick={() => navigateTo("add-new-route")}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none" }}
        >
          Add Route
        </Button>
      </Box>

      <Typography
        px={3}
        py={1.5}
        fontWeight="bold"
        bgcolor={t => t.palette.grey[200]}
      >
        Today: {dayjs().format("DD/MM/YYYY")}
      </Typography>
      <RoutesTable routes={todayRoutes} isLoading={isFetching} />

      <Typography
        px={3}
        py={1.5}
        fontWeight="bold"
        bgcolor={t => t.palette.grey[200]}
      >
        Tomorrow: {dayjs().add(1, "day").format("DD/MM/YYYY")}
      </Typography>
      <RoutesTable routes={tomorrowRoutes} isLoading={isFetching} />

      <Typography
        px={3}
        py={1.5}
        fontWeight="bold"
        bgcolor={t => t.palette.grey[200]}
      >
        Future Routes
      </Typography>
      <RoutesTable routes={futureRoutes} isLoading={isFetching} />
    </Box>
  );
};

export default ActiveRoutes;
