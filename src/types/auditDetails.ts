import { TMeatStatus, TShopStatus } from "./orderDetails";

export type TAudit = {
  Items: TAuditItem[];
  Count: number | 0;
};

export type TAuditType = "dashboard" | "shop" | "meat" | "driver";

export type TAuditItem = {
  orderNumber: number;
  datetime: string;
  activity: string;
  auditId: string;
  code?: string | null;
  comment: string;
  username: string;
  usernameDatetime: string;
  auditType?: TAuditType;
  fromShopStatus?: TShopStatus;
  toShopStatus?: TShopStatus;
  fromMeatStatus?: TMeatStatus;
  toMeatStatus?: TMeatStatus;
};

export type TPhoto = {
  Items: TPhotoItem[];
  Count: number;
};

export type TPhotoItem = {
  orderNumber: number;
  activity: string;
  usernameDatetime: string;
  comment: string;
  url: string;
  username: string;
  datetime: string;
  auditId: string;
};
