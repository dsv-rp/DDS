import { isServer as litIsServer } from "lit";

export const isClient =
  (!litIsServer as boolean) && typeof window !== "undefined";
