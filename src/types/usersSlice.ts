export type TSearchStr = string | null;

export type TUsersState = {
  searchStr: TSearchStr;
};

export type TUsersFilterState = {
  searchStr: TSearchStr;
};

export type TSetSearchStrPayload = {
  searchStr: TSearchStr;
};
