import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";
import React from "react";

import type { DaikinTabStoryArgs } from "./common";
import { ReactDaikinTab } from "./react";

const StoryTab: React.FC<DaikinTabStoryArgs> = ({
  size,
  active,
  disabled,
  label,
}) => {
  return (
    <ReactDaikinTab
      size={size}
      active={active}
      disabled={disabled}
      onClick={action("click")}
    >
      {label}
    </ReactDaikinTab>
  );
};

const meta = {
  title: "Components/Tab",
  tags: ["autodocs"],
  component: StoryTab,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "condensed"],
    },
    active: { type: "boolean" },
    disabled: { type: "boolean" },
    label: {
      type: "string",
    },
  },
} satisfies Meta<DaikinTabStoryArgs>;

export default meta;

export { Tab } from "./common";
