import React from "react";

import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";

import "../daikin-radio";
import type { DaikinRadioStoryArgs } from "./common";

const Radio: React.FC<DaikinRadioStoryArgs> = ({
  size,
  disabled,
  readonly,
  labelPosition,
  label,
  checked,
}) => {
  return (
    <daikin-radio
      size={size}
      disabled={disabled ? true : undefined}
      onClick={action("radio-click")}
      readonly={readonly ? true : undefined}
      label-position={labelPosition}
      label={label}
      checked={checked ? true : undefined}
    ></daikin-radio>
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
