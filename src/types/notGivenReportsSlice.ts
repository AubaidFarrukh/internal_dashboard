import type { TAfter, TBefore, TCursor, TPageSize } from "./commons";

export type TNotGivenReportsState = {
  pageSize: TPageSize;
  currentReport: string | null;
  cursor: TCursor;
  after: TAfter;
  before: TBefore;
};

export type TSetCurrentReportPayload = {
  currentReport: string | null;
};

export type TSetCursorPayload = {
  newCursor: TCursor;
};

export type TSetDateRangePayload = {
  after: TAfter;
  before: TBefore;
};
