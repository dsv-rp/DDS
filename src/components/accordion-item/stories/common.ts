import type { DaikinAccordionItem } from "#package/components/accordion-item/daikin-accordion-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinAccordionItemStoryArgs = Required<
  ElementProps<DaikinAccordionItem>
>;

export const DAIKIN_ACCORDION_ITEM_ARG_TYPES = {
  heading: {
    type: "string",
  },
  open: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
} satisfies Meta<DaikinAccordionItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAccordionItemStoryArgs>;
