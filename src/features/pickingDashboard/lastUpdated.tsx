import { FC, useEffect, useState, useRef } from "react";
import { Typography, SxProps, Theme } from "@mui/material";

export interface LastUpdatedProps {
  timestamp: number | undefined;
  sx?: SxProps<Theme>;
}

export const LastUpdated: FC<LastUpdatedProps> = ({ timestamp, sx }) => {
  const timeNow = Math.round(new Date().getTime() / 1000);
  const timeFulfilled = Math.round((timestamp ?? 0) / 1000);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  let phrase = "a few seconds ago";

  useEffect(() => {
    const diff = timeNow - timeFulfilled;
    if (ref.current) {
      if (!timestamp) {
        ref.current.textContent = "Loading...";
      } else {
        // Less than a minute
        if (diff < 60) {
          ref.current.textContent = "Last updated a few seconds ago";
          // Between 1 and 2 minutes
        } else if (diff < 120) {
          ref.current.textContent = `Last updated a minute ago`;
          // Between 2 and 59 minutes
        } else if (diff < 3600) {
          ref.current.textContent = `Last updated ${Math.floor(
            diff / 60
          )} minutes ago`;
          // Between 59 and 100 minutes
        } else if (diff < 6000) {
          ref.current.textContent = `Last updated an hour ago`;
        } else {
          ref.current.textContent = `Last updated ${Math.round(
            diff / 3600
          )} hours ago`;
        }
      }
    }

    // Rerender every 5 second
    const timeout = setTimeout(() => {
      setCount(prev => prev + 1);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [timeFulfilled, timeNow, timestamp, count]);

  return (
    <Typography
      variant="caption"
      color="text.secondary"
      fontWeight={600}
      ref={ref}
      sx={sx}
    >
      Last updated {phrase}
    </Typography>
  );
};

export default LastUpdated;
