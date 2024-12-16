import type { DaikinCardHeader } from "#package/components/card-header/daikin-card-header";
import type { IconType } from "#package/components/icon";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCardHeaderStoryArgs
  extends Required<ElementProps<DaikinCardHeader>> {
  label: string;
  description: string;
  leftIcon: IconType | null;
}

export const DAIKIN_CARD_HEADER_ARG_TYPES =
  {} as const satisfies Meta<DaikinCardHeaderStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCardHeaderStoryArgs>;
