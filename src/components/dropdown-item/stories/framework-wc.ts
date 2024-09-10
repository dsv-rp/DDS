import "#package/components/dropdown-item/daikin-dropdown-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinDropdownItemStoryArgs } from "./common";

export const metadata: Meta<DaikinDropdownItemStoryArgs> = {
  render: ({ value, disabled, onSelect, __vrtSelected__ }) => html`
    <daikin-dropdown-item
      value=${value}
      ?disabled=${disabled}
      ?selected=${__vrtSelected__}
      @select=${onSelect}
    >
      Dropdown item
    </daikin-dropdown-item>
  `,
};
