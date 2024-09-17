import "#package/components/list-item/daikin-list-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinListItemStoryArgs } from "./common";

export const metadata: Meta<DaikinListItemStoryArgs> = {
  render: ({ type, href, leftIcon, disabled, onClick }) => html`
    <daikin-list-item
      type=${type}
      href=${ifDefined(href)}
      left-icon=${ifDefined(leftIcon)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      List item label
    </daikin-list-item>
  `,
};
