import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { BreadcrumSeparator } from "./breadcrumSeparator";
import { toTitleCase } from "../../utils";

export const RouterBreadCrumbs: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.replaceAll("/", " ").trim().split(" ");
  const pathPartSlugs = pathParts.map(
    (_, i) => `/${pathParts.slice(0, i + 1).join("/")}`
  );
  let pathPartNames = pathParts.map(part =>
    toTitleCase(
      decodeURIComponent(part.replaceAll("-", " ").replaceAll("and", "&"))
    )
  );

  // Formating for picking dashboard.
  if (pathPartNames[0] === "") {
    pathPartNames[0] = `Picking Dashboard`;
  }

  // Formating for order details page.
  if (pathPartNames[pathParts.length - 2] === "Orders") {
    pathPartNames[pathParts.length - 1] = `Order #SC${
      pathPartNames[pathParts.length - 1]
    }`;
  }

  // Formating for product details page.
  if (pathPartNames[pathParts.length - 2] === "Products") {
    pathPartNames[pathParts.length - 1] = `Product #${
      pathPartNames[pathParts.length - 1]
    }`;
  }

  // Formating for user details page.
  if (pathPartNames[pathParts.length - 2] === "Users & Permissions") {
    pathPartNames[pathParts.length - 1] =
      pathPartNames[pathParts.length - 1].split(":")[0];
  }

  // Formating for edit route page.
  if (
    pathPartNames[pathParts.length - 2] === "Delivery & Dispatch" &&
    pathParts[pathParts.length - 1] === "edit-route"
  ) {
    pathPartNames[pathParts.length - 1] = location.state.route.routeName;
  }

  const linkHandler = (path: string) => {
    navigate(path);
  };

  const fontWeight = 600;
  const fontSize = 18;

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" separator={<BreadcrumSeparator />}>
        <Typography
          color="text.primary"
          fontWeight={fontWeight}
          fontSize={fontSize}
        >
          SaveCo Hub
        </Typography>
        {pathParts.slice(0, pathParts.length - 1).map((slug, i) => (
          <Link
            underline="hover"
            href={pathPartSlugs[i]}
            onClick={e => {
              e.preventDefault();
              linkHandler(pathPartSlugs[i]);
            }}
            color="text.primary"
            fontWeight={fontWeight}
            fontSize={fontSize}
            key={slug}
          >
            {pathPartNames[i]}
          </Link>
        ))}
        <Typography
          color="text.primary"
          fontWeight={fontWeight}
          fontSize={fontSize}
        >
          {pathPartNames[pathParts.length - 1]}
        </Typography>
      </Breadcrumbs>
      <Box sx={{ height: theme => theme.spacing(3) }} />
    </Box>
  );
};

export default RouterBreadCrumbs;
