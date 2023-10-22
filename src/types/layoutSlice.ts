export type TLayoutState = {
  message: {
    success: boolean | null;
    message: string | null;
  };
  isDrawerOpen: "BUTTON" | "MOUSE" | null;
  showChildren: { [key: string]: boolean };
};

export type TSetMessagePayload = {
  success: boolean | null;
  message: string | null;
};

export type TSetIsDrawerOpenPayload = Pick<TLayoutState, "isDrawerOpen">;

export type TSetShowChildrenPayload = { key: string };
