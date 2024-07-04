/* eslint-disable @typescript-eslint/no-explicit-any -- Generics requires any. */

import type { VariantProps } from "class-variance-authority";

type OmitNull<T> = { [K in keyof T]: Exclude<T[K], null> };

/**
 * Merges all properties from CVA functions.
 * If there are multiple properties with the same name and different possible values, the union of the value will be a product set.
 *
 * 1. Apply `VariantProps` to all union items to get props
 * 2. Convert union to intersect
 * 3. Apply `OmitNull` to eliminate nulls
 *
 * @example
 * ```
 * type NotificationVariantProps = MergeVariantProps<
 *   | typeof notificationContentClassName
 *   | typeof notificationIconClassName
 *   | typeof notificationIconContainerClassName
 *   | typeof notificationContainerClassName
 * >;
 * ```
 */
export type MergeVariantProps<T extends (...args: any) => any> = OmitNull<
  (
    T extends (...args: any[]) => any ? (v: VariantProps<T>) => void : never
  ) extends (v: infer U) => void
    ? U
    : never
>;
