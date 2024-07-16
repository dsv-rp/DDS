import type { WebComponentProps } from "@lit/react";

// A to Z
type Uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[number];

// regex: /^on[A-Z].*$/
type EventListenerKeys<K> = K extends `on${Uppercase}${string}` ? K : never;

// T without on* props
type OmitEventListeners<T> = Omit<T, EventListenerKeys<keyof T>>;

export type ElementProps<T extends HTMLElement> = OmitEventListeners<
  WebComponentProps<T>
>;
