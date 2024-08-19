import type { DaikinPaginationOverflow } from "#package/components/pagination-overflow/daikin-pagination-overflow";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinPaginationOverflowStoryArgs
  extends Required<ElementProps<DaikinPaginationOverflow>> {
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}

export const DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES = {
  value: { type: "number" },
  max: { type: "number" },
  totalItems: { type: "number" },
} as const satisfies Meta<DaikinPaginationOverflowStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinPaginationOverflowStoryArgs>;
