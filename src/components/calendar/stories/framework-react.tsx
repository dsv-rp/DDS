import { DaikinCalendar } from "#package/components/calendar/daikin-calendar";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { vrtSelectedDate, type DaikinCalendarStoryArgs } from "./common";

const ReactDaikinCalendar = createComponent({
  react: React,
  tagName: "daikin-calendar",
  elementClass: DaikinCalendar,
  events: {
    onSelect: "select",
  },
});

export const metadata: Meta<DaikinCalendarStoryArgs> = {
  component: ({ isVrtSelected, ...props }: DaikinCalendarStoryArgs) => (
    <ReactDaikinCalendar
      {...props}
      value={
        isVrtSelected ? vrtSelectedDate(!!props.defaultValue) : props.value
      }
    />
  ),
};
