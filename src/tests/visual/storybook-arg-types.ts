type FallbackType = unknown;

type StorybookArgType =
  // https://storybook.js.org/docs/api/arg-types#type
  | { type: string }
  // https://storybook.js.org/docs/api/arg-types#options
  | { options: readonly string[] };

type StorybookTypeMap = {
  string: string;
  boolean: boolean;
  number: number;
  enum: string | number;
};

type InferStorybookType<T extends string> = T extends keyof StorybookTypeMap
  ? StorybookTypeMap[T]
  : FallbackType;

type InferArgType<T extends StorybookArgType> = T extends {
  options: readonly (infer U)[];
}
  ? U
  : T extends { type: string }
    ? InferStorybookType<T["type"]>
    : FallbackType;

export type InferStorybookArgTypes<T extends Record<string, StorybookArgType>> =
  { [K in keyof T]?: InferArgType<T[K]> | undefined };
