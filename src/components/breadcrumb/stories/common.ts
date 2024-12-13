import type { DaikinBreadcrumb } from "#package/components/breadcrumb/daikin-breadcrumb";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinBreadcrumbStoryArgs = Required<
  ElementProps<DaikinBreadcrumb>
>;

export const DAIKIN_BREADCRUMB_ARG_TYPES = {
  showVisited: {
    type: "boolean",
  },
} as const satisfies Meta<DaikinBreadcrumbStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinBreadcrumbStoryArgs>;
