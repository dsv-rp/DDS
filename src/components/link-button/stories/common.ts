import type { IconType } from "#package/components/icon";
import type { DaikinLinkButton } from "#package/components/link-button/daikin-link-button";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinLinkButtonStoryArgs
  extends Required<ElementProps<DaikinLinkButton>> {
  label: string;
  leftIcon: IconType | null;
  rightIcon: IconType | null;
}

export const DAIKIN_LINK_BUTTON_ARG_TYPES = {
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
} as const satisfies Meta<DaikinLinkButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinLinkButtonStoryArgs>;
