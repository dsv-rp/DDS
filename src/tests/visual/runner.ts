import { test } from "@playwright/test";

export function describeEach<T>(
  items: readonly T[],
  callback: (item: T) => void
): void;
export function describeEach<T>(
  items: readonly T[],
  titleFormatter: (item: T) => string,
  callback: (item: T) => void
): void;

export function describeEach<T>(
  items: readonly T[],
  ...args: [(item: T) => void] | [(item: T) => string, (item: T) => void]
) {
  const [callback, titleFormatter] = (
    args.length === 1 ? [args[0], String] : [args[1], args[0] ?? String]
  ) as [(item: T) => void, (item: T) => string];

  for (const item of items) {
    test.describe(titleFormatter(item), () => callback(item));
  }
}
