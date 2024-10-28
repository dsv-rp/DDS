import "#package/components/tree-item/daikin-tree-item";
import "#package/components/tree-section/daikin-tree-section";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTreeSectionStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeSectionStoryArgs> = {
  render: ({ label, selected, disabled, open, onClick }) => html`
    <daikin-tree-section
      label=${label}
      ?selected=${selected}
      ?disabled=${disabled}
      ?open=${open}
      @click=${onClick}
    >
      <span slot="label">${label}</span>
      <daikin-tree-item ?disabled=${disabled}>Tree item</daikin-tree-item>
    </daikin-tree-section>
  `,
};
