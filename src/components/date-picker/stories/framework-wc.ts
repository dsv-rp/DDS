import "#package/components/date-picker/daikin-date-picker";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { vrtSelectedDate } from "../../calendar/stories/common";
import { type DaikinDatePickerStoryArgs } from "./common";

export const metadata: Meta<DaikinDatePickerStoryArgs> = {
  render: ({
    value,
    name,
    placeholder,
    min,
    max,
    readonly,
    disabled,
    required,
    error,
    open,
    defaultValue,
    isVrtSelected,
    onSelect,
  }) =>
    html`<div data-testid="vrt-container" class="w-[22.5rem] h-[24rem]">
      <daikin-date-picker
        placeholder=${ifDefined(placeholder ?? undefined)}
        name=${ifDefined(name ?? undefined)}
        min=${ifDefined(min)}
        max=${ifDefined(max)}
        default-value=${defaultValue}
        ?readonly=${readonly}
        ?disabled=${disabled}
        ?required=${required}
        ?error=${error}
        ?open=${open}
        .value=${isVrtSelected ? vrtSelectedDate(!!defaultValue) : value}
        @select=${onSelect}
      ></daikin-date-picker>
    </div>`,
};
