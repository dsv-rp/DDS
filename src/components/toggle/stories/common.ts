import type { DaikinToggle } from "#package/components/toggle/daikin-toggle";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinToggleStoryArgs
  extends Required<ElementProps<DaikinToggle>> {
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}

export const DAIKIN_TOGGLE_ARG_TYPES = {
  name: { type: "string" },
  value: { type: "string" },
  checked: { type: "boolean" },
  disabled: { type: "boolean" },
} as const satisfies Meta<DaikinToggleStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinToggleStoryArgs>;
