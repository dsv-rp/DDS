import type { DaikinPagination } from "#package/components/pagination/daikin-pagination";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinPaginationStoryArgs
  extends Required<ElementProps<DaikinPagination>> {
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}

export const DAIKIN_PAGINATION_ARG_TYPES = {
  current: { type: "number" },
  total: { type: "number" },
  window: { type: "number" },
} as const satisfies Meta<DaikinPaginationStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinPaginationStoryArgs>;
