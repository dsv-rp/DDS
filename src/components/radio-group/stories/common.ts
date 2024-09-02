import type { DaikinRadioGroup } from "#package/components/radio-group/daikin-radio-group";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinRadioGroupStoryArgs
  extends Required<ElementProps<DaikinRadioGroup>> {
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}

export const DAIKIN_RADIO_GROUP_ARG_TYPES = {
  orientation: {
    control: { type: "select" },
    options: ["horizontal", "vertical"],
  },
  disabled: { type: "boolean" },
  labelPosition: { type: "string" },
  defaultSelected: { type: "string" },
  label: {
    type: "string",
  },
  value: { type: "string" },
} satisfies Meta<DaikinRadioGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinRadioGroupStoryArgs>;
