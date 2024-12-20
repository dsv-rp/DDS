import type { DaikinCardFooter } from "#package/components/card-footer/daikin-card-footer";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCardFooterStoryArgs
  extends Required<ElementProps<DaikinCardFooter>> {
  actionType: "button" | "link";
}

export const DAIKIN_CARD_FOOTER_ARG_TYPES = {
  actionType: {
    control: "radio",
    options: ["button", "link"],
  },
} as const satisfies Meta<DaikinCardFooterStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCardFooterStoryArgs>;
