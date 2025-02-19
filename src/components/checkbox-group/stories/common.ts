import type { DaikinCheckboxGroup } from "#package/components/checkbox-group/daikin-checkbox-group";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinCheckboxGroupStoryArgs = Required<
  ElementProps<DaikinCheckboxGroup>
>;

export const DAIKIN_CHECKBOX_GROUP_ARG_TYPES = {
  orientation: {
    control: {
      type: "radio",
    },
    options: ["horizontal", "vertical"],
  },
} satisfies Meta<DaikinCheckboxGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCheckboxGroupStoryArgs>;
