import type { DaikinAccordionItem } from "#package/components/accordion-item/daikin-accordion-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinAccordionItemStoryArgs
  extends Required<ElementProps<DaikinAccordionItem>> {
  onToggle: () => void;
}

export const DAIKIN_ACCORDION_ITEM_ARG_TYPES = {
  name: {
    type: "string",
  },
  open: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
  onToggle: {
    name: "",
  },
} satisfies Meta<DaikinAccordionItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAccordionItemStoryArgs>;
