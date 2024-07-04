import React from "react";

import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";

import "../daikin-radio";
import type { DaikinRadioStoryArgs } from "./common";
import { ReactDaikinRadio } from "./react";

const Radio: React.FC<DaikinRadioStoryArgs> = ({
  size,
  disabled,
  readonly,
  labelPosition,
  label,
  checked,
  name,
  value,
}) => {
  return (
    <ReactDaikinRadio
      size={size}
      disabled={disabled}
      onClick={action("radio-click")}
      onChange={action("radio-change")}
      readonly={readonly}
      label-position={labelPosition}
      label={label}
      checked={checked}
      name={name}
      value={value}
    ></ReactDaikinRadio>
  );
};

const meta = {
  title: "Components/Radio",
  tags: ["autodocs"],
  component: Radio,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    checked: { type: "boolean" },
    disabled: { type: "boolean" },
    labelPosition: { type: "string" },
    readonly: { type: "boolean" },
    label: {
      type: "string",
    },
    name: { type: "string" },
    value: { type: "string" },
  },
} satisfies Meta<DaikinRadioStoryArgs>;

export default meta;

export { Large, Small } from "./common";
