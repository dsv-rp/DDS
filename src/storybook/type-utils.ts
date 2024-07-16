import type { WebComponentProps } from "@lit/react";

// regex: /^on[A-Z]/
// Note that `Capitalize<string>` includes strings that contain uppercase letters from the second character onwards. (e.g. `KeyDown`)
type EventListenerKeys<K> = K extends `on${Capitalize<string>}` ? K : never;

// T without /^on[A-Z]/ props
type OmitEventListeners<T> = Omit<T, EventListenerKeys<keyof T>>;

export type ElementProps<T extends HTMLElement> = OmitEventListeners<
  WebComponentProps<T>
>;
