import type { DaikinAccordionItem } from "#package/components/accordion-item/daikin-accordion-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinAccordionItemStoryArgs = Required<
  ElementProps<DaikinAccordionItem>
>;

export const DAIKIN_ACCORDION_ITEM_ARG_TYPES = {
  title: {
    description: "Heading of accordion",
    type: "string",
  },
  open: {
    description: "Whether the component is open",
    defaultValue: false,
    type: "boolean",
  },
  disabled: {
    description: "Whether the accordion is disabled",
    defaultValue: false,
    type: "boolean",
  },
} satisfies Meta<DaikinAccordionItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAccordionItemStoryArgs>;
