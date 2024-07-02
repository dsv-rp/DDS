export type OmitNull<T> = { [K in keyof T]: Exclude<T[K], null> };
