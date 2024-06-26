import { test } from "@playwright/test";

export function describeEach<T>(
  items: readonly T[],
  callback: (item: T) => void,
  titleFormatter: (item: T) => string = String
) {
  for (const item of items) {
    test.describe(titleFormatter(item), () => callback(item));
  }
}
