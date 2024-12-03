import type { IconType } from "#package/components/icon";
import type { DaikinLink } from "#package/components/link/daikin-link";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinLinkStoryArgs
  extends Required<ElementProps<DaikinLink>> {
  label: string;
  leftIcon: IconType | null;
  rightIcon: IconType | null;
  withSentence: boolean;
}

export const DAIKIN_LINK_ARG_TYPES = {
  target: {
    type: "string",
  },
  href: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  showVisited: {
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
  withSentence: {
    type: "boolean",
  },
} as const satisfies Meta<DaikinLinkStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinLinkStoryArgs>;
