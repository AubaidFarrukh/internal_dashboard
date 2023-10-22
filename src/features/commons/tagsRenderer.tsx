import { FC } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface TagsRendererProps {
  tags: string[];
}

export const TagsRenderer: FC<TagsRendererProps> = ({ tags }) => {
  const theme = useTheme();

  return (
    <Stack spacing={0.5}>
      {tags.map(tag => (
        <Paper
          key={tag}
          sx={{
            backgroundColor: theme.palette.grey[300],
            p: theme.spacing(0, 1),
          }}
        >
          <Typography
            color={theme => theme.palette.grey["A100"]}
            variant="caption"
            bgcolor="grey"
            fontWeight="bold"
          >
            {tag}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
};

export default TagsRenderer;
