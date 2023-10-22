import { FC } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBar } from "../commons";
import { useAppDispatch } from "../../context/redux/hooks";
import { setOrderNumber as setOrderNumberAction } from "./ordersSlice";
import type { TOrderNumber } from "../../types/orders";

interface OrderSearchBarProps {
  orderNumberLocal: TOrderNumber | null;
  setOrderNumberLocal: (o: TOrderNumber | null) => void;
  sx: SxProps<Theme>;
}

export const OrderSearchBar: FC<OrderSearchBarProps> = ({
  orderNumberLocal,
  setOrderNumberLocal,
  sx,
}) => {
  const dispatch = useAppDispatch();

  // Update value if the input is a valid number.
  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value === "") return setOrderNumberLocal(null);
    if (e.target.value.length > 10) return;
    if (!+e.target.value) return;
    setOrderNumberLocal(+e.target.value);
  };

  const clearInput = () => {
    setOrderNumberLocal(null);
    dispatch(setOrderNumberAction({ orderNumber: null }));
  };

  const updateState = () => {
    dispatch(setOrderNumberAction({ orderNumber: orderNumberLocal }));
  };

  const onPressEnter: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === "Enter") updateState();
  };

  return (
    <>
      <SearchBar
        placeholder="Order Number..."
        variant="outlined"
        value={orderNumberLocal ?? ""}
        onChange={onValueChange}
        onKeyDown={onPressEnter}
        clearInput={clearInput}
      />
      <Button
        onClick={updateState}
        variant="contained"
        color="primary"
        title="Search order by its number."
        sx={sx}
      >
        <SearchIcon sx={{ fill: "#ffffff" }} />
      </Button>
    </>
  );
};

export default OrderSearchBar;
