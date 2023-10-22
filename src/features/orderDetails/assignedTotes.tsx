import React, { FC } from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import {
  AmbientIcon,
  BagIcon,
  BulkIcon,
  ChickenIcon,
  ChilledIcon,
  FrozenIcon,
  LoadingContent,
} from "../commons";
import { useGetOrderByIdQuery } from "../../services/api";
import type { TTote } from "../../types/orderDetails";

interface AssignedTotesProps {
  orderNumber: number;
}

export const AssignedTotes: FC<AssignedTotesProps> = ({ orderNumber }) => {
  const { isLoading, data: order } = useGetOrderByIdQuery({ orderNumber });
  const totes = order?.totes ?? [];
  const maxBags = totes.reduce(
    (max, tote) => (tote.bags.length > max ? tote.bags.length : max),
    0
  );

  const categoryIcons = {
    Meat: ChickenIcon,
    Ambient: AmbientIcon,
    Chilled: ChilledIcon,
    Frozen: FrozenIcon,
    Bulk: BulkIcon,
  };

  return (
    <Paper square sx={{ pt: 3 }}>
      <Typography variant="h5" component="h2" fontWeight={600} px={3} mb={1}>
        Assigned Totes
      </Typography>
      <Divider variant="fullWidth" />

      {isLoading ? (
        <LoadingContent sx={{ py: 2 }} />
      ) : !totes.length ? (
        <Typography py={2} px={3}>
          No totes data available.
        </Typography>
      ) : (
        <Stack direction="column">
          {totes.map((tote: TTote) => (
            <Box
              key={tote.id + tote.category}
              display="flex"
              alignItems="center"
              borderBottom={1}
              borderColor="divider"
              px={3}
              py={1}
            >
              {React.createElement(categoryIcons[tote.category], {
                color: "#000000",
                size: 20,
                sx: { mr: 2 },
              })}
              <Typography variant="body1" component="span" mr="auto">
                {tote.category !== "Bulk" ? tote.id : "Items"}
              </Typography>
              <Box display="flex" width={maxBags * 20}>
                {tote.bags?.map((_, i) => (
                  <BagIcon
                    key={i}
                    sx={{ color: t => t.palette.primary.main }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default AssignedTotes;
