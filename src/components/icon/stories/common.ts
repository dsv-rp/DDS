import {
  type DaikinIcon,
  iconList,
} from "#package/components/icon/daikin-icon";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinIconStoryArgs = Required<ElementProps<DaikinIcon>>;

export const DAIKIN_ICON_ARG_TYPES = {
  icon: {
    control: "select",
    options: iconList,
  },
  color: {
    control: "radio",
    options: ["black", "white", "default", "current"],
  },
  size: {
    control: "radio",
    options: ["s", "m", "l", "xl", "current"],
  },
} satisfies Meta<DaikinIconStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinIconStoryArgs>;
