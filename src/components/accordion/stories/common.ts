import type { DaikinAccordion } from "#package/components/accordion/daikin-accordion";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinAccordionStoryArgs = Required<ElementProps<DaikinAccordion>>;

export const DAIKIN_ACCORDION_ARG_TYPES =
  {} satisfies Meta<DaikinAccordionStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAccordionStoryArgs>;
