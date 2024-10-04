import "#package/components/tree-item/daikin-tree-item";
import "#package/components/tree-section/daikin-tree-section";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTreeSectionStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeSectionStoryArgs> = {
  render: ({ label, selected, disabled, open, hierarchy, onClick }) => html`
    <daikin-tree-section
      label=${label}
      hierarchy=${hierarchy}
      ?selected=${selected}
      ?disabled=${disabled}
      ?open=${open}
      @click=${onClick}
    >
      <daikin-tree-item>Tree item</daikin-tree-item>
    </daikin-tree-section>
  `,
};
