import type { DaikinTooltip } from "#package/components/tooltip/daikin-tooltip";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTooltipStoryArgs
  extends Required<ElementProps<DaikinTooltip>> {
  descriptionSlotText: string;
  onClick: (event: Event) => void;
}

export const DAIKIN_TOOLTIP_ARG_TYPES = {
  placement: {
    control: { type: "select" },
    options: ["top", "bottom", "left", "right"],
  },
  variant: {
    control: { type: "select" },
    options: ["light", "dark"],
  },
  open: { type: "boolean" },
  description: {
    type: "string",
  },
  closeOnClick: { type: "boolean" },
  trigger: {
    control: { type: "select" },
    options: ["hover", "manual"],
  },
  descriptionSlotText: {
    type: "string",
  },
} as const satisfies Meta<DaikinTooltipStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTooltipStoryArgs>;
