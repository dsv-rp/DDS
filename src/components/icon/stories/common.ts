import {
  type DaikinIcon,
  iconList,
} from "#package/components/icon/daikin-icon";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinIconStoryArgs = Required<ElementProps<DaikinIcon>>;

export const DAIKIN_ICON_ARG_TYPES = {
  icon: {
    description: "Specify the name of the icon",
    control: { type: "select" },
    options: iconList,
  },
  color: {
    description: "Specify icon color",
    defaultValue: "black",
    control: { type: "radio" },
    options: ["black", "white", "colored", "current"],
  },
  size: {
    description: "Specify the height and width of the icon",
    defaultValue: "m",
    control: { type: "radio" },
    options: ["s", "m", "l", "xl"],
  },
} satisfies Meta<DaikinIconStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinIconStoryArgs>;
