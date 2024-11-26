import "#package/components/tree-item/daikin-tree-item";
import "#package/components/tree-section/daikin-tree-section";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTreeSectionStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeSectionStoryArgs> = {
  render: ({
    value,
    selectable,
    selected,
    disabled,
    open,
    label,
    onToggle,
  }) => html`
    <daikin-tree-section
      value=${value}
      ?selectable=${selectable}
      ?selected=${selected}
      ?disabled=${disabled}
      ?open=${open}
      @toggle=${onToggle}
    >
      <span slot="label">${label}</span>
      <daikin-tree-item ?disabled=${disabled}>Tree item</daikin-tree-item>
    </daikin-tree-section>
  `,
};
