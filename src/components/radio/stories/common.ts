import type { DaikinRadio } from "#package/components/radio/daikin-radio";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinRadioStoryArgs
  extends Required<ElementProps<DaikinRadio>> {
  onChange: () => void;
  onClick: () => void;
}

export const DAIKIN_RADIO_ARG_TYPES = {
  name: {
    type: "string",
  },
  value: {
    type: "string",
  },
  label: {
    type: "string",
  },
  labelPosition: {
    control: {
      type: "radio",
    },
    options: ["left", "right", "hidden"],
  },
  checked: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
} satisfies Meta<DaikinRadioStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinRadioStoryArgs>;
