import type { DaikinBreadcrumbItem } from "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinBreadcrumbItemStoryArgs = Required<
  ElementProps<DaikinBreadcrumbItem>
>;

export const DAIKIN_BREADCRUMB_ITEM_ARG_TYPES = {
  href: { type: "string" },
  variant: {
    control: "radio",
    options: ["normal", "ellipsis"],
  },
  disabled: { type: "boolean" },
  target: {
    control: "radio",
    options: ["_blank", "_self", "_parent", "_top"],
  },
  trailingSlash: { type: "boolean" },
} as const satisfies Meta<DaikinBreadcrumbItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinBreadcrumbItemStoryArgs>;
