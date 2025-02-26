import "#package/components/dropdown-item/daikin-dropdown-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinDropdownItemStoryArgs } from "./common";

export const metadata: Meta<DaikinDropdownItemStoryArgs> = {
  render: ({ value, disabled, selected, selectable, onSelect }) => html`
    <daikin-dropdown-item
      value=${value}
      ?disabled=${disabled}
      ?selected=${selected}
      ?selectable=${selectable}
      @select=${onSelect}
    >
      Dropdown item
    </daikin-dropdown-item>
  `,
};
