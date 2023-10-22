import { FC, useState } from "react";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { TransitionGroup } from "react-transition-group";
import { AssignedOrder } from "./assignedOrder";
import { CustomModal, RouteStatus } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectAssignedOrders,
  selectRouteStatus,
  moveOrder as moveOrderAction,
} from "./routeFormSlice";

export interface AssignedOrdersProps {
  sx?: SxProps<Theme>;
}

export const AssignedOrders: FC<AssignedOrdersProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const routeStatus = useAppSelector(selectRouteStatus);
  const assignedOrders = useAppSelector(
    selectAssignedOrders,
    (a, b) => a.join(",") === b.join(",")
  );

  const moveOrder = (from: number, to: number) => {
    dispatch(moveOrderAction({ from, to }));
  };

  const [showWarning, setShowWarning] = useState(false);
  const [drag, setDrag] = useState({ from: 0, to: 0, order: 0 });
  const openWarningModal = () => setShowWarning(true);
  const closeWarningModal = () => setShowWarning(false);
  const handleConfirmMoving = (from: number, to: number) => {
    moveOrder(from, to);
    closeWarningModal();
  };

  const onDragEnd: OnDragEndResponder = result => {
    // dropped outside the list
    if (!result.destination) return;

    // Show warning if the status is in Loading.
    if (routeStatus === "Loading") {
      setDrag({
        from: result.source.index,
        to: result.destination.index,
        order: Number(result.draggableId),
      });
      openWarningModal();
    } else {
      moveOrder(result.source.index, result.destination.index);
    }
  };

  return (
    <Paper
      square
      sx={{
        border: 1,
        borderColor: "divider",
        pb: 3,
        height: "100%",
        ...sx,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        fontWeight={600}
        p={3}
        borderBottom={0.5}
        borderColor="divider"
      >
        Assigned Orders
      </Typography>
      <TransitionGroup>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ borderBottom: 0.5, borderColor: "divider" }}
              >
                {assignedOrders.map((order, index) => (
                  <AssignedOrder key={order} order={order} index={index} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <CustomModal
            open={showWarning}
            title="Moving Order"
            confirmText="Confirm"
            cancelText="Cancel"
            handleConfirmation={() => handleConfirmMoving(drag.from, drag.to)}
            handleCancel={closeWarningModal}
            children={
              <Box>
                This route is currently in <RouteStatus status="Loading" />. Are
                you sure you want to change the position of the order{" "}
                <strong>#SC{drag.order}</strong>.
              </Box>
            }
          />
        </DragDropContext>
      </TransitionGroup>
    </Paper>
  );
};

export default AssignedOrders;
