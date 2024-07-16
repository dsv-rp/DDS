import type { DaikinBreadcrumbItem } from "#package/components/breadcrumb-item/daikin-breadcrumb-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinBreadcrumbItemStoryArgs = Required<
  ElementProps<DaikinBreadcrumbItem>
>;

export const DAIKIN_BREADCRUMB_ITEM_ARG_TYPES = {
  href: { type: "string" },
  size: {
    control: { type: "select" },
    options: ["max", "min"],
  },
  disabled: { type: "boolean" },
  target: {
    control: { type: "select" },
    options: ["_blank", "_self", "_parent", "_top", "framename"],
  },
  trailingSlash: { type: "boolean" },
} as const satisfies Meta<DaikinBreadcrumbItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinBreadcrumbItemStoryArgs>;
