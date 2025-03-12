import type { DaikinLoading } from "#package/components/loading/daikin-loading";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinLoadingStoryArgs
  extends Required<ElementProps<DaikinLoading>> {
  isVrt: boolean;
}

export const DAIKIN_LOADING_ARG_TYPES = {
  size: {
    control: "radio",
    options: ["small", "medium"],
  },
  background: {
    type: "boolean",
  },
  isVrt: {
    name: "",
    type: "boolean",
  },
} satisfies Meta<DaikinLoadingStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinLoadingStoryArgs>;
