import "#package/components/calendar/daikin-calendar";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { vrtSelectedDate, type DaikinCalendarStoryArgs } from "./common";

export const metadata: Meta<DaikinCalendarStoryArgs> = {
  render: ({ value, min, max, defaultValue, view, isVrtSelected, onSelect }) =>
    html`<daikin-calendar
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      default-value=${defaultValue}
      view=${view}
      .value=${isVrtSelected ? vrtSelectedDate(!!defaultValue) : value}
      @select=${onSelect}
    ></daikin-calendar>`,
};
