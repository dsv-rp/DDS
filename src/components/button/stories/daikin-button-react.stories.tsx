// organize-imports-ignore
import type { Meta } from "@storybook/react";
import { DAIKIN_BUTTON_ARG_TYPES, type DaikinButtonStoryArgs } from "./common";
import { ReactDaikinButton } from "./react";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  component: ({ label, ...props }: DaikinButtonStoryArgs) => (
    <ReactDaikinButton {...props}>{label}</ReactDaikinButton>
  ),
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
} satisfies Meta<DaikinButtonStoryArgs>;

export {
  Primary,
  PrimaryDanger,
  Secondary,
  Tertiary,
  Disabled,
} from "./commonStories";
