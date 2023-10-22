import { FC, ReactNode } from "react";
import { Box, List, Paper, SxProps, Theme } from "@mui/material";
import { LightTooltip, LoadingContent, TextRenderer } from "../commons";

export interface TableContainerProps {
  heading: ReactNode;
  tooltip?: string;
  subHeading?: ReactNode;
  list: ReactNode[] | undefined;
  listHeader?: ReactNode;
  loading?: boolean;
  sx?: SxProps<Theme>;
}

export const TableContainer: FC<TableContainerProps> = ({
  heading,
  tooltip,
  subHeading = <TextRenderer>&zwnj;</TextRenderer>,
  list = [],
  listHeader,
  loading,
  sx,
}) => {
  return (
    <Paper
      square
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box p={3} pb={1} borderBottom={1} borderColor="divider" height={82.67}>
        <LightTooltip title={tooltip}>
          <Box
            display="flex"
            alignItems="center"
            mb={-0.75}
            sx={{ cursor: "pointer", width: "fit-content" }}
          >
            {heading}
          </Box>
        </LightTooltip>
        {subHeading}
      </Box>

      {listHeader}
      {loading ? (
        <LoadingContent />
      ) : (
        <List
          sx={{
            overflowY: "auto",
            flex: 1,
            bgcolor: t => (!list.length ? t.palette.grey[100] : undefined),
            p: 0,
            m: 0,
          }}
        >
          {list}
        </List>
      )}
    </Paper>
  );
};

export default TableContainer;
