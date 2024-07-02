import type { Meta } from "@storybook/react";
import { DAIKIN_BUTTON_ARG_TYPES, type DaikinButtonStoryArgs } from "./common";
import { ReactDaikinButton } from "./react";

const StoryDaikinButton = ({ label, ...props }: DaikinButtonStoryArgs) => {
  return <ReactDaikinButton {...props}>{label}</ReactDaikinButton>;
};

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  component: StoryDaikinButton,
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
} satisfies Meta<DaikinButtonStoryArgs>;

export {
  Primary,
  PrimaryDanger,
  Secondary,
  Tertiary,
  Disabled,
} from "./commonStories";
