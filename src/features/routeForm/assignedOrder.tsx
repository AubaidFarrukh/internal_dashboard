import { FC, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Draggable } from "@hello-pangea/dnd";
import { CustomModal, RouteStatus } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  unassignOrder as unassignOrderAction,
  selectRouteStatus,
} from "./routeFormSlice";

export interface AssignedOrderProps {
  order: number;
  index: number;
  sx?: SxProps<Theme>;
}

export const AssignedOrder: FC<AssignedOrderProps> = ({ order, index, sx }) => {
  const t = useTheme();

  const dispatch = useAppDispatch();
  const unassignOrder = (order: number) => {
    dispatch(unassignOrderAction({ order }));
  };

  const routeStatus = useAppSelector(selectRouteStatus);

  const [showWarning, setShowWarning] = useState(false);
  const openWarningModal = () => setShowWarning(true);
  const closeWarningModal = () => setShowWarning(false);
  const handleConfirmRemoving = () => {
    unassignOrder(order);
    closeWarningModal();
  };

  const onClickRemove = () => {
    if (routeStatus === "Loading") {
      openWarningModal();
    } else {
      unassignOrder(order);
    }
  };

  return (
    <Collapse in={true} key={order}>
      <Draggable draggableId={order.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              backgroundColor: snapshot.isDragging
                ? t.palette.grey[300]
                : t.palette.common.white,
              borderTopWidth: `${snapshot.isDragging ? 1 : 0.5}px`,
              borderBottomWidth: `${snapshot.isDragging ? 1 : 0.5}px`,
              borderRightWidth: `${snapshot.isDragging ? 1 : 0}px`,
              borderLeftWidth: `${snapshot.isDragging ? 1 : 0}px`,
              borderStyle: "solid",
              borderColor: t.palette.divider,
              padding: t.spacing(0.25, 2),
              transition: "background-color 500ms",
              ...provided.draggableProps.style,
            }}
          >
            <IconButton
              onClick={onClickRemove}
              size="small"
              sx={{ mr: 0.75, p: 0.25 }}
            >
              <ClearIcon />
            </IconButton>
            <CustomModal
              open={showWarning}
              title="Remove Order"
              confirmText="Confirm"
              cancelText="Cancel"
              handleConfirmation={handleConfirmRemoving}
              handleCancel={closeWarningModal}
              children={
                <Box>
                  This route is currently in <RouteStatus status="Loading" />.
                  Are you sure you want to remove the order{" "}
                  <strong>#SC{order}</strong>.
                </Box>
              }
            />
            <IconButton
              {...provided.dragHandleProps}
              size="small"
              sx={{ mt: -0.25, mr: 1.5, p: 0.25, cursor: "grab" }}
            >
              <DragIndicatorIcon />
            </IconButton>
            <Typography sx={{ width: 25, mr: 1 }}>{index + 1}.</Typography>
            <Typography>#SC{order}</Typography>
          </div>
        )}
      </Draggable>
    </Collapse>
  );
};

export default AssignedOrder;
