import type { TAlignmentX, TAlignmentY } from "../../../types/table";

export const DEFAULT_ROW_HEIGHT = 50;
export const DEFAULT_ID_EXTRACTOR = (r: any) => r.id;
export const DEFAULT_CELL_ALIGNMENT_X: TAlignmentX = "left";
export const DEFAULT_CELL_ALIGNMENT_Y: TAlignmentY = "center";
export const DEFAULT_CELL_PADDING_X = 2;
export const DEFAULT_CELL_PADDING_Y = 2;
export const DEFAULT_ROW_PADDING_X = 2;
export const DEFAULT_ROW_PADDING_Y = 2;
export const DEFAULT_ROW_SPACING = 0;
export const DEFAULT_CELL_SPACING = 0;
export const DEFAULT_TABLE_TOOLBAR = () => <></>;
export const DEFAULT_TABLE_FOOTER = () => <></>;
