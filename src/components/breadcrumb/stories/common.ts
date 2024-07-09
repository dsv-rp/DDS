import type { DaikinBreadcrumbItem } from "#package/components/breadcrumb/daikin-breadcrumb-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinBreadcrumbItemStoryArgs = Required<
  ElementProps<DaikinBreadcrumbItem>
>;

export const DAIKIN_BREADCRUMB_ARG_TYPES = {
  href: { type: "string" },
  size: {
    control: { type: "select" },
    options: ["max", "min"],
  },
  noTrailingSlash: { type: "boolean" },
} as const satisfies Meta<DaikinBreadcrumbItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinBreadcrumbItemStoryArgs>;
