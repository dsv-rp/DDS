import type { DaikinRadio } from "#package/components/radio/daikin-radio";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinRadioStoryArgs
  extends Required<ElementProps<DaikinRadio>> {
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
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
    control: "radio",
    options: ["right", "hidden"],
  },
  checked: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
  // Hide event listeners
  onChange: { name: "" },
  onClick: { name: "" },
} satisfies Meta<DaikinRadioStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinRadioStoryArgs>;
