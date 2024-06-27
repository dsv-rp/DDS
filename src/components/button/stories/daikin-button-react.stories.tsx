import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";
import React from "react";
import { DAIKIN_BUTTON_ARG_TYPES, type DaikinButtonStoryArgs } from "./common";
import { ReactDaikinButton } from "./react";

const StoryDaikinButton = ({ label, ...props }: DaikinButtonStoryArgs) => {
  return (
    <ReactDaikinButton {...props} onClick={action("click")}>
      {label}
    </ReactDaikinButton>
  );
};

const meta = {
  title: "Components/Button",
  tags: ["autodocs"],
  component: StoryDaikinButton,
  argTypes: DAIKIN_BUTTON_ARG_TYPES,
} satisfies Meta<DaikinButtonStoryArgs>;

export default meta;

export { Primary, PrimaryDanger, Secondary, Tertiary } from "./common";
