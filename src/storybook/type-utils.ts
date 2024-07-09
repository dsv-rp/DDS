import type { WebComponentProps } from "@lit/react";

type EventListenerKeys<K> =
  K extends `on${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[number]}${string}` ? K : never;
type OmitEventListeners<T> = Omit<T, EventListenerKeys<keyof T>>;

export type ElementProps<T extends HTMLElement> = OmitEventListeners<
  WebComponentProps<T>
>;
