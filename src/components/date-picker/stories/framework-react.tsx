import { DaikinDatePicker } from "#package/components/date-picker/daikin-date-picker";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { vrtSelectedDate } from "../../calendar/stories/common";
import { type DaikinDatePickerStoryArgs } from "./common";

export const ReactDaikinDatePicker = createComponent({
  react: React,
  tagName: "daikin-date-picker",
  elementClass: DaikinDatePicker,
  events: {
    onSelect: "select",
  },
});

export const metadata: Meta<DaikinDatePickerStoryArgs> = {
  component: ({ isVrtSelected, ...props }: DaikinDatePickerStoryArgs) => (
    <div data-testid="vrt-container" className="w-[22.5rem] h-[24rem]">
      <ReactDaikinDatePicker
        {...props}
        value={
          isVrtSelected ? vrtSelectedDate(!!props.defaultValue) : props.value
        }
      />
    </div>
  ),
};
