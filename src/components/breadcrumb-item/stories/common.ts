import type { DaikinBreadcrumbItem } from "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinBreadcrumbItemStoryArgs
  extends Required<ElementProps<DaikinBreadcrumbItem>> {
  label: string;
}

export const DAIKIN_BREADCRUMB_ITEM_ARG_TYPES = {
  href: {
    type: "string",
  },
  variant: {
    control: "radio",
    options: ["normal", "current"],
  },
  disabled: {
    type: "boolean",
  },
  target: {
    type: "string",
  },
  showVisited: {
    type: "boolean",
  },
  label: {
    type: "string",
  },
} as const satisfies Meta<DaikinBreadcrumbItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinBreadcrumbItemStoryArgs>;
