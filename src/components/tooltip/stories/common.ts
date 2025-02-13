import type { DaikinTooltip } from "#package/components/tooltip/daikin-tooltip";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTooltipStoryArgs
  extends Required<ElementProps<DaikinTooltip>> {
  hasSlot: boolean;
  hasFocusableTrigger: boolean;
  viewArea: "small" | "full";
  onClick: (event: Event) => void;
  onToggle: (event: Event) => void;
  onBeforeToggle: (event: Event) => void;
  __vrtContainer__: boolean;
}

export const DAIKIN_TOOLTIP_ARG_TYPES = {
  placement: {
    control: "radio",
    options: ["top", "bottom", "left", "right"],
  },
  color: {
    control: "radio",
    options: ["default", "inverse"],
  },
  open: {
    type: "boolean",
  },
  description: {
    type: "string",
  },
  popoverValue: {
    control: "radio",
    options: ["auto", "manual"],
  },
  trigger: {
    control: "radio",
    options: ["hover", "click", "manual"],
  },
  hasSlot: {
    type: "boolean",
  },
  hasFocusableTrigger: {
    type: "boolean",
  },
  viewArea: {
    control: "radio",
    options: ["small", "full"],
  },
  __vrtContainer__: {
    type: "boolean",
    control: false,
  },
} as const satisfies Meta<DaikinTooltipStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTooltipStoryArgs>;
