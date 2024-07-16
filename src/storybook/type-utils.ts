import type { WebComponentProps } from "@lit/react";

type Uppercase =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

// regex: /^on[A-Z]/
type EventListenerKeys<K> = K extends `on${Uppercase}${string}` ? K : never;

// T without /^on[A-Z]/ props
type OmitEventListeners<T> = Omit<T, EventListenerKeys<keyof T>>;

export type ElementProps<T extends HTMLElement> = OmitEventListeners<
  WebComponentProps<T>
>;
