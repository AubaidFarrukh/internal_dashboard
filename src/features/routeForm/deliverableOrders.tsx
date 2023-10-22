import { FC, useState } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CustomModal, RouteStatus, SearchBar } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectAssignedOrders,
  selectRemovedOrders,
  selectRouteStatus,
  assignOrder as assignOrderAction,
} from "./routeFormSlice";
import { useGetAllDeliverableOrdersQuery } from "../../services/api";

export interface DeliverableOrdersProps {
  sx?: SxProps<Theme>;
}

export const DeliverableOrders: FC<DeliverableOrdersProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const assignedOrders = useAppSelector(selectAssignedOrders);
  const removedOrders = useAppSelector(selectRemovedOrders);
  const routeStatus = useAppSelector(selectRouteStatus);

  const { data, isLoading, isFetching } = useGetAllDeliverableOrdersQuery({});
  const orders = data?.orders ?? [];
  const [searchKey, setSearchKey] = useState("");
  const deliverableOrders = [...orders, ...removedOrders]
    .filter(order => !assignedOrders.includes(order))
    .filter(order => order.toString().includes(searchKey));

  const assignOrder = (order: number) => {
    dispatch(assignOrderAction({ order }));
  };

  const [showWarning, setShowWarning] = useState(false);
  const [currOrder, setCurrOrder] = useState(0);
  const openWarningModal = () => setShowWarning(true);
  const closeWarningModal = () => setShowWarning(false);
  const handleConfirmAdding = (order: number) => {
    assignOrder(order);
    closeWarningModal();
  };

  const onClickAdd = (order: number) => {
    if (routeStatus === "Loading") {
      setCurrOrder(order);
      openWarningModal();
    } else {
      assignOrder(order);
    }
  };

  const skeleton = (
    <>
      {[0, 1, 2, 3, 4].map(iii => (
        <Skeleton key={iii} variant="text" height={45} />
      ))}
    </>
  );

  const ordersList = (
    <TransitionGroup>
      {deliverableOrders.map((order, iii) => (
        <Collapse key={order}>
          <ListItem
            sx={{
              p: t => t.spacing(0.25, 2),
              bgcolor: t =>
                iii % 2 === 0 ? t.palette.grey[200] : t.palette.common.white,
            }}
          >
            <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
              <Checkbox
                onClick={() => onClickAdd(order)}
                size="small"
                checked={routeStatus === "Loading" ? false : undefined}
                sx={{ mr: 0.5, p: 0.5 }}
              />
            </ListItemIcon>
            <ListItemText>#SC{order}</ListItemText>
          </ListItem>
        </Collapse>
      ))}
    </TransitionGroup>
  );

  return (
    <Paper
      square
      sx={{ height: "100%", border: 1, borderColor: "divider", ...sx }}
    >
      <Typography variant="h5" component="h2" fontWeight={600} p={3}>
        Add Orders
      </Typography>
      <SearchBar
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
        clearInput={() => setSearchKey("")}
        size="small"
        variant="outlined"
        placeholder="Search..."
        fullWidth
        sx={{ px: 3, mb: 2 }}
      />
      <List>{isLoading || isFetching ? skeleton : ordersList}</List>
      <CustomModal
        open={showWarning}
        title="Add Order"
        confirmText="Confirm"
        cancelText="Cancel"
        handleConfirmation={() => handleConfirmAdding(currOrder)}
        handleCancel={closeWarningModal}
        children={
          <Box>
            This route is currently in <RouteStatus status="Loading" />. Are you
            sure you want to add the order <strong>#SC{currOrder}</strong>.
          </Box>
        }
      />
    </Paper>
  );
};

export default DeliverableOrders;
