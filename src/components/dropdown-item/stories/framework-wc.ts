import "#package/components/dropdown-item/daikin-dropdown-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinDropdownItemStoryArgs } from "./common";

export const metadata: Meta<DaikinDropdownItemStoryArgs> = {
  render: ({ value }) => html`
    <daikin-dropdown-item value=${value}>Value</daikin-dropdown-item>
  `,
};
