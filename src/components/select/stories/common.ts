import type { DaikinSelect } from "#package/components/select/daikin-select";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinSelectStoryArgs = Required<ElementProps<DaikinSelect>>;

export const DAIKIN_SELECT_ARG_TYPES = {
  error: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
} satisfies Meta<DaikinSelectStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinSelectStoryArgs>;
