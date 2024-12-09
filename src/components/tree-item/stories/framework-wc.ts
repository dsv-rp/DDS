import "#package/components/tree-item/daikin-tree-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTreeItemStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeItemStoryArgs> = {
  render: ({ value, selected, disabled, label, onClick }) => html`
    <daikin-tree-item
      value=${value}
      ?selected=${selected}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${label}
    </daikin-tree-item>
  `,
};
