import { FC } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectRouteName,
  selectVan,
  selectSendDate,
  selectDriver,
  selectComment,
  selectAssignedOrders,
  selectPreviousOrders,
  resetForm,
} from "../routeForm/routeFormSlice";
import { setMessage } from "../layout/layoutSlice";
import { selectCurrentUser } from "../../services/auth";
import { useEditRouteMutation } from "../../services/api";

export interface SaveChangesButtonProps {
  routeId: string;
}

export const SaveChangesButton: FC<SaveChangesButtonProps> = ({ routeId }) => {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const routeName = useAppSelector(selectRouteName);
  const van = useAppSelector(selectVan);
  const sendDate = useAppSelector(selectSendDate);
  const driver = useAppSelector(selectDriver);
  const comment = useAppSelector(selectComment);
  const assignedOrders = useAppSelector(selectAssignedOrders);
  const previousOrders = useAppSelector(selectPreviousOrders);
  const [editRoute, { isLoading: isSaving, reset }] = useEditRouteMutation();

  const saveRoute = async () => {
    // Validate form.
    if (!currentUser) {
      dispatch(
        setMessage({ success: false, message: "You are not signed in." })
      );
      return;
    }
    if (!routeName) {
      dispatch(
        setMessage({ success: false, message: "Route name is required." })
      );
      return;
    }
    if (!van) {
      dispatch(
        setMessage({ success: false, message: "Van name is required." })
      );
      return;
    }
    if (!sendDate) {
      dispatch(
        setMessage({ success: false, message: "Send date is required." })
      );
      return;
    }
    if (!driver) {
      dispatch(
        setMessage({ success: false, message: "Please, select a driver." })
      );
      return;
    }
    if (!assignedOrders.length) {
      dispatch(
        setMessage({
          success: false,
          message: "Please, select the orders to deliver.",
        })
      );
      return;
    }

    const ordersAdded = assignedOrders.filter(
      ao => !previousOrders.includes(ao)
    );
    const ordersRemoved = previousOrders.filter(
      po => !assignedOrders.includes(po)
    );

    // Save route.
    const body = {
      username: currentUser.username,
      id: routeId,
      routeName,
      van,
      sendDate: dayjs(sendDate).format("YYYY/MM/DD"),
      driver: driver.username,
      comment,
      orders: assignedOrders,
      ordersAdded,
      ordersRemoved,
    };
    const res = await editRoute(body).unwrap();
    if (res.status === "SUCCESS") {
      navigateTo("/delivery-and-dispatch");
      dispatch(setMessage({ success: true, message: res.message }));
      dispatch(resetForm());
    } else {
      dispatch(setMessage({ success: false, message: res.message }));
    }
    reset();
  };

  return (
    <Button
      onClick={saveRoute}
      variant="contained"
      startIcon={isSaving ? <CircularProgress size="1rem" /> : <SaveIcon />}
      disabled={isSaving}
      fullWidth
      sx={{ textTransform: "none", width: 150 }}
    >
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
};

export default SaveChangesButton;
