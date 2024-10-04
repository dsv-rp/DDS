import "#package/components/tree-item/daikin-tree-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTreeItemStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeItemStoryArgs> = {
  render: ({ type, href, selected, disabled, hierarchy, onClick }) => html`
    <daikin-tree-item
      type=${type}
      href=${ifDefined(href)}
      hierarchy=${hierarchy}
      ?selected=${selected}
      ?disabled=${disabled}
      @click=${onClick}
    >
      Tree item
    </daikin-tree-item>
  `,
};
