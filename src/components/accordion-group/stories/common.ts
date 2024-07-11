import type { DaikinAccordionGroup } from "#package/components/accordion-group/daikin-accordion-group";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinAccordionGroupStoryArgs = Required<
  ElementProps<DaikinAccordionGroup>
>;

export const DAIKIN_ACCORDION_GROUP_ARG_TYPES =
  {} satisfies Meta<DaikinAccordionGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAccordionGroupStoryArgs>;
