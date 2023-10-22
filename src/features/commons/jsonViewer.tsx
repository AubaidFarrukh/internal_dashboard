import { FC } from "react";
import { Paper, Typography } from "@mui/material";

interface JsonViewerProps {
  json: object;
}

export const JsonViewer: FC<JsonViewerProps> = ({ json }) => (
  <Paper sx={{ p: theme => theme.spacing(3) }}>
    <Paper
      elevation={0}
      sx={{
        p: theme => theme.spacing(3),
        bgcolor: theme => theme.palette.grey[100],
        overflow: "auto",
      }}
    >
      <Typography component="pre" sx={{ maxWidth: "100px" }}>
        {JSON.stringify(json, null, 4)}
      </Typography>
    </Paper>
  </Paper>
);

export default JsonViewer;
