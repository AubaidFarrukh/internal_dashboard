import { FC, useState } from "react";
import { Stack } from "@mui/material";
import { UsersByRoll } from "./usersByRoll";
import { LoadingContent, NotFound } from "../commons";
import { useGetAllUsersQuery } from "../../services/api";
import { useAppSelector } from "../../context/redux/hooks";
import { selectSearchStr } from "./usersSlice";
import type { TRole } from "../../types/users";

export const AllUsers: FC = () => {
  const { data: users, isLoading, isFetching, error } = useGetAllUsersQuery({});
  const searchStr = useAppSelector(selectSearchStr);
  const [openAccordion, setOpenAccordion] = useState<Record<TRole, boolean>>({
    admin: true,
    manager: false,
    staff: false,
    shop_picker: false,
    meat_picker: false,
    driver: false,
  });
  const [openFilterAccordion, setOpenFilterAccordion] = useState(true);

  const filteredUsers =
    searchStr && users
      ? users.filter(({ firstName, lastName, username, email }) =>
          `${firstName}#${lastName}#${email}#${username}`
            .toLowerCase()
            .includes(searchStr.toLowerCase())
        )
      : [];
  const admins = users?.filter(u => u.role === "admin") ?? [];
  const managers = users?.filter(u => u.role === "manager") ?? [];
  const staff = users?.filter(u => u.role === "staff") ?? [];
  const shopPickers = users?.filter(u => u.role === "shop_picker") ?? [];
  const meatPickers = users?.filter(u => u.role === "meat_picker") ?? [];
  const drivers = users?.filter(u => u.role === "driver") ?? [];

  const handleAccordionChange = (accordion: TRole) => {
    setOpenAccordion(prev => {
      return { ...prev, [accordion]: !prev[accordion] };
    });
  };

  if (isLoading || isFetching) {
    return <LoadingContent />;
  }

  if (error) {
    return <NotFound message="Users data not found" />;
  }

  return (
    <Stack>
      {searchStr ? (
        <UsersByRoll
          header="Search Results"
          users={filteredUsers}
          expanded={openFilterAccordion}
          onChange={() => setOpenFilterAccordion(prev => !prev)}
        />
      ) : null}
      <UsersByRoll
        header="Admin"
        users={admins}
        expanded={openAccordion["admin"]}
        onChange={() => handleAccordionChange("admin")}
      />
      <UsersByRoll
        header="Manager"
        users={managers}
        expanded={openAccordion["manager"]}
        onChange={() => handleAccordionChange("manager")}
      />
      <UsersByRoll
        header="Staff"
        users={staff}
        expanded={openAccordion["staff"]}
        onChange={() => handleAccordionChange("staff")}
      />
      <UsersByRoll
        header="Shop Picker"
        users={shopPickers}
        expanded={openAccordion["shop_picker"]}
        onChange={() => handleAccordionChange("shop_picker")}
      />
      <UsersByRoll
        header="Meat Picker"
        users={meatPickers}
        expanded={openAccordion["meat_picker"]}
        onChange={() => handleAccordionChange("meat_picker")}
      />
      <UsersByRoll
        header="Driver"
        users={drivers}
        expanded={openAccordion["driver"]}
        onChange={() => handleAccordionChange("driver")}
      />
    </Stack>
  );
};

export default AllUsers;
