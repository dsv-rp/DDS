import type { IconType } from "#package/components/icon";
import type { DaikinTextLink } from "#package/components/text-link/daikin-text-link";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTextLinkStoryArgs
  extends Required<ElementProps<DaikinTextLink>> {
  label: string;
  leftIcon: IconType | null;
  rightIcon: IconType | null;
}

export const DAIKIN_TEXT_LINK_ARG_TYPES = {
  target: {
    type: "string",
  },
  href: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  hasVisited: {
    type: "boolean",
  },
  label: {
    type: "string",
  },
  leftIcon: {
    type: "string",
  },
  rightIcon: {
    type: "string",
  },
} as const satisfies Meta<DaikinTextLinkStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextLinkStoryArgs>;
