import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  CSSObject,
  Divider,
  Drawer,
  List,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { SidebarButton } from "./sidebarButton";
import {
  DashboardIcon,
  NotePadIcon,
  ProductsIcon,
  SignOutIcon,
  TruckIconFilled,
  UsersIcon,
} from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { signOut } from "../../services/auth";
import {
  selectIsDrawerOpen,
  selectShowChildren,
  setIsDrawerOpen,
  setShowChildren,
} from "../layout/layoutSlice";

export const SIDEBAR_WIDTH_OPEN = 274;
export const SIDEBAR_WIDTH_CLOSED = 81;
export const TRANSITION_DURATION = 225;

export const Sidebar: FC = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const dispatchSignOut = () => {
    dispatch(signOut());
  };

  // Sub-menu
  const showChildren = useAppSelector(selectShowChildren);
  const openSubMenu = (id: string) => {
    dispatch(setShowChildren({ key: id }));
  };

  // Drawer controls
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const openDrawerMouse = () => {
    isDrawerOpen === null &&
      dispatch(setIsDrawerOpen({ isDrawerOpen: "MOUSE" }));
  };
  const closeDrawerMouse = () => {
    isDrawerOpen === "MOUSE" &&
      dispatch(setIsDrawerOpen({ isDrawerOpen: null }));
  };
  const openedMixin = (theme: Theme): CSSObject => ({
    width: SIDEBAR_WIDTH_OPEN,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: SIDEBAR_WIDTH_CLOSED,
  });
  const [showLabels, setShowLabels] = useState(false);
  useEffect(() => {
    isDrawerOpen && setShowLabels(true);
    !isDrawerOpen &&
      setTimeout(() => setShowLabels(false), TRANSITION_DURATION - 50);
  }, [isDrawerOpen]);

  const isReportPage = (location: string) =>
    location.startsWith("/daily-z-report") ||
    location.startsWith("/not-given-reports") ||
    location.startsWith("/barcode-addition-reports");
  const isUsersPage = (location: string) =>
    location.startsWith("/users-and-permissions") ||
    location.startsWith("/add-new-user");
  const sidebarSections = [
    {
      id: "dashboard",
      label: "Picking Dashboard",
      Icon: DashboardIcon,
      slug: "",
      isActive: location.pathname === "/",
      onClick: () => navigateTo("/"),
    },
    {
      id: "orders",
      label: "Orders",
      Icon: NotePadIcon,
      slug: "orders",
      isActive: location.pathname.startsWith("/orders"),
      onClick: () => navigateTo("/orders"),
    },
    {
      id: "products",
      label: "Products",
      Icon: ProductsIcon,
      slug: "products",
      isActive: location.pathname.startsWith("/products"),
      onClick: () => navigateTo("/products"),
    },
    {
      id: "delivery",
      label: "Delivery & Dispatch",
      Icon: TruckIconFilled,
      slug: "delivery-and-dispatch",
      isActive: location.pathname.startsWith("/delivery-and-dispatch"),
      onClick: () => navigateTo("/delivery-and-dispatch"),
    },
    {
      id: "reports",
      label: "Reports",
      Icon: NotePadIcon,
      isActive: !showChildren["reports"] && isReportPage(location.pathname),
      onClick: () => openSubMenu("reports"),
      children: [
        {
          id: "z-reports",
          label: "Daily Z-Reports",
          slug: "daily-z-report",
          isActive:
            showChildren["reports"] &&
            location.pathname.startsWith("/daily-z-report"),
          onClick: () => navigateTo("/daily-z-report"),
        },
        {
          id: "not-given-reports",
          label: "Not-Given Reports",
          slug: "not-given-reports",
          isActive:
            showChildren["reports"] &&
            location.pathname.startsWith("/not-given-reports"),
          onClick: () => navigateTo("/not-given-reports"),
        },
        {
          id: "barcode-addition-reports",
          label: "Barcode Addition Reports",
          slug: "barcode-addition-reports",
          isActive:
            showChildren["reports"] &&
            location.pathname.startsWith("/barcode-addition-reports"),
          onClick: () => navigateTo("/barcode-addition-reports"),
        },
      ],
    },
    {
      id: "users",
      label: "Users & Permissions",
      Icon: UsersIcon,
      isActive: !showChildren["users"] && isUsersPage(location.pathname),
      onClick: () => openSubMenu("users"),
      children: [
        {
          id: "allUsers",
          label: "All Users",
          slug: "users-and-permissions",
          isActive:
            showChildren["users"] &&
            location.pathname.startsWith("/users-and-permissions"),
          onClick: () => navigateTo("/users-and-permissions"),
        },
        {
          id: "new-user",
          label: "Add New User",
          slug: "add-new-user",
          isActive:
            showChildren["users"] &&
            location.pathname.startsWith("/add-new-user"),
          onClick: () => navigateTo("/add-new-user"),
        },
      ],
    },
  ] as TSidebarSection[];

  return (
    <Drawer
      variant="permanent"
      open={Boolean(isDrawerOpen)}
      transitionDuration={TRANSITION_DURATION}
      sx={{
        py: 2,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(isDrawerOpen && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!isDrawerOpen && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
    >
      <Box
        display="flex"
        width={showLabels ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED}
      >
        <Box width={isDrawerOpen ? 24.715 : 29.115} height="100%"></Box>
        <Typography
          color="primary"
          component="h1"
          variant="h4"
          fontFamily="Bebas Neue"
          fontSize={60}
          textAlign="center"
          width="fit-content"
          noWrap
          mt={4}
          mb={2}
          sx={{ userSelect: "none" }}
        >
          {showLabels ? "SAVECO HUB" : "S"}
        </Typography>
      </Box>
      <Box onMouseEnter={openDrawerMouse} onMouseLeave={closeDrawerMouse}>
        <List sx={{ px: 1.5, py: 0 }}>
          {sidebarSections.map(section => (
            <Box key={section.id}>
              <SidebarButton
                label={section.label}
                Icon={section.Icon}
                isActive={section.isActive}
                hasChildren={Boolean(section.children?.length)}
                isOpen={showChildren[section.id]}
                showLabel={showLabels}
                onClick={section.onClick}
                sx={{ mb: 1, height: 36 }}
              />
              <Collapse
                in={showChildren[section.id]}
                timeout="auto"
                unmountOnExit
              >
                <List sx={{ py: 0 }}>
                  {section.children
                    ? section.children.map(child => (
                        <SidebarButton
                          key={child.id}
                          label={child.label}
                          Icon={child.Icon}
                          isActive={child.isActive}
                          hasChildren={false}
                          showLabel={showLabels}
                          onClick={child.onClick}
                          sx={{ mb: 1, height: 36 }}
                        />
                      ))
                    : null}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
        <Divider variant="fullWidth" sx={{ mt: 2, mb: 1 }} />
        <List sx={{ px: 1.5, py: 0 }}>
          <SidebarButton
            label="Sign Out"
            Icon={SignOutIcon}
            isActive={false}
            hasChildren={false}
            showLabel={showLabels}
            onClick={dispatchSignOut}
            sx={{ height: 36 }}
          />
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

type TSidebarSection = {
  id: string;
  label: string;
  Icon?: FC<{ color?: string }>;
  slug?: string;
  isActive: boolean;
  children?: TSidebarSection[];
  onClick: () => void;
};
