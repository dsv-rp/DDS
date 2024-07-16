import type { DaikinRadio } from "#package/components/radio/daikin-radio";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinRadioStoryArgs
  extends Required<ElementProps<DaikinRadio>> {
  onChange: () => void;
  onClick: () => void;
}

export const DAIKIN_RADIO_ARG_TYPES = {
  size: {
    control: { type: "select" },
    options: ["small", "large"],
  },
  checked: { type: "boolean" },
  disabled: { type: "boolean" },
  labelPosition: { type: "string" },
  readonly: { type: "boolean" },
  label: {
    type: "string",
  },
  name: { type: "string" },
  value: { type: "string" },
} satisfies Meta<DaikinRadioStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinRadioStoryArgs>;
