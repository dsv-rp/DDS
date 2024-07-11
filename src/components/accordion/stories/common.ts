import type { DaikinAccordion } from "#package/components/accordion/daikin-accordion";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinAccordionStoryArgs = Required<ElementProps<DaikinAccordion>>;

export const DAIKIN_ACCORDION_ARG_TYPES = {
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
} satisfies Meta<DaikinAccordionStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAccordionStoryArgs>;
