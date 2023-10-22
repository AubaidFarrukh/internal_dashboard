import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IsEditing } from "./isEditing";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectEditingMode,
  selectBarcodes,
  setBarcodes,
} from "./productDetailsSlice";
import type { FC } from "react";
import type { TBarcodes } from "../../types/products";

export interface ProductBarcodesProps {
  barcodes: TBarcodes;
}

export const ProductBarcodes: FC<ProductBarcodesProps> = ({ barcodes }) => {
  const dispatch = useAppDispatch();
  const isEditingMode = useAppSelector(selectEditingMode);
  const barcodesState = useAppSelector(selectBarcodes);

  const addNewBarcode = () => {
    let barcodes = [...barcodesState];
    barcodes.push("");
    dispatch(setBarcodes({ barcodes }));
  };

  const deleteBarcode = (barcodeIndex: number) => {
    let barcodes = [...barcodesState];
    barcodes.splice(barcodeIndex, 1);
    dispatch(setBarcodes({ barcodes }));
  };

  const updateBarcode = (barcodeIndex: number, barcode: string) => {
    let barcodes = [...barcodesState];
    barcodes[barcodeIndex] = barcode;
    dispatch(setBarcodes({ barcodes }));
  };

  return (
    <Paper square>
      <Box
        display="flex"
        alignItems="start"
        px={3}
        py={2}
        borderBottom={t => `1px solid ${t.palette.grey[300]}`}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Barcodes
        </Typography>
        {isEditingMode ? <IsEditing sx={{ ml: "auto" }} /> : null}
      </Box>
      {!isEditingMode ? (
        <Box display="flex" flexDirection="column" justifyContent="center">
          {barcodes.length ? (
            barcodes.map((b, iii) => (
              <Box
                key={b}
                px={3}
                py={2}
                borderBottom={t => `1px solid ${t.palette.grey[300]}`}
              >
                <Typography fontWeight={500} mb={1}>
                  Barcode {iii + 1}
                </Typography>
                <Typography>{b}</Typography>
              </Box>
            ))
          ) : (
            <Box py={2} px={3}>
              <Typography>No barcodes.</Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" justifyContent="center">
          {barcodesState?.map((b, iii) => (
            <Box
              key={iii}
              pl={3}
              pr={2}
              py={2}
              borderBottom={t => `1px solid ${t.palette.grey[300]}`}
            >
              <Typography fontWeight={500} mb={1}>
                Barcode {iii + 1}
              </Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  id={`barcode${iii}`}
                  value={b}
                  onChange={e => updateBarcode(iii, e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ pr: 1 }}
                />
                <IconButton onClick={() => deleteBarcode(iii)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button
            onClick={addNewBarcode}
            startIcon={<AddIcon />}
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Add Another
          </Button>
        </Box>
      )}
    </Paper>
  );
};
export default ProductBarcodes;
