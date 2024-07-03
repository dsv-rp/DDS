import React from "react";

import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";

import "../daikin-checkbox";
import type { DaikinCheckboxStoryArgs } from "./common";
import { ReactDaikinCheckbox } from "./react";

const Checkbox: React.FC<DaikinCheckboxStoryArgs> = ({
  size,
  disabled,
  readonly,
  labelPosition,
  label,
  checkState,
}) => {
  return (
    <ReactDaikinCheckbox
      size={size}
      disabled={disabled}
      readonly={readonly}
      label-position={labelPosition}
      label={label}
      check-state={checkState}
      onChange={action("checkbox-change")}
      onClick={action("checkbox-click")}
    ></ReactDaikinCheckbox>
  );
};

const meta = {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  component: Checkbox,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    checkState: {
      control: { type: "select" },
      options: ["unchecked", "indeterminate", "checked"],
    },
    disabled: { type: "boolean" },
    labelPosition: { type: "string" },
    readonly: { type: "boolean" },
    label: {
      type: "string",
    },
    name: { type: "string" },
    value: { type: "string" },
  },
} satisfies Meta<DaikinCheckboxStoryArgs>;

export default meta;

export { Large, Small } from "./common";
