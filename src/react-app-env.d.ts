/// <reference types="react-scripts" />
import { EStatus } from "./types/orders";

declare module "@mui/material/styles" {
  interface Palette {
    tag: {
      color: string;
      bgColor: string;
    };
    orderStatus: {
      [EStatus.PAID]: {
        color: string;
        bgColor: string;
      };
      [EStatus.PICKING_IN_PROGRESS]: {
        color: string;
        bgColor: string;
      };
      [EStatus.READY_FOR_COLLECTION]: {
        color: string;
        bgColor: string;
      };
      [EStatus.TO_BE_PICKED]: {
        color: string;
        bgColor: string;
      };
      [EStatus.CANCELLED]: {
        color: string;
        bgColor: string;
      };
      [EStatus.DELIVERED]: {
        color: string;
        bgColor: string;
      };
    };
    orderRow: {
      cancelled: {
        color: string;
        bgColor: string;
      };
      delivered: {
        color: string;
        bgColor: string;
      };
    };
    orderNote: {
      main: string;
      cancelled: string;
      delivered: string;
      header: string;
    };
  }
  interface PaletteOptions {
    tag: {
      color: string;
      bgColor: string;
    };
    orderStatus: {
      [EStatus.PAID]: {
        color: string;
        bgColor: string;
      };
      [EStatus.PICKING_IN_PROGRESS]: {
        color: string;
        bgColor: string;
      };
      [EStatus.READY_FOR_COLLECTION]: {
        color: string;
        bgColor: string;
      };
      [EStatus.TO_BE_PICKED]: {
        color: string;
        bgColor: string;
      };
      [EStatus.CANCELLED]: {
        color: string;
        bgColor: string;
      };
      [EStatus.DELIVERED]: {
        color: string;
        bgColor: string;
      };
    };
    orderRow: {
      cancelled: {
        color: string;
        bgColor: string;
      };
      delivered: {
        color: string;
        bgColor: string;
      };
    };
    orderNote: {
      main: string;
      cancelled: string;
      delivered: string;
      header: string;
    };
  }
}
