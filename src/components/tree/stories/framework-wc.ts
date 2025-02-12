import "#package/components/tree-item/daikin-tree-item";
import "#package/components/tree-section/daikin-tree-section";
import "#package/components/tree/daikin-tree";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTreeStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeStoryArgs> = {
  render: ({ selectable, selected }) => html`
    <div style="width:400px;">
      <daikin-tree
        ?selectable=${selectable}
        selected=${ifDefined(selected ?? undefined)}
      >
        <daikin-tree-section value="1" open>
          <span slot="label">Tree section 1</span>
          <daikin-tree-item value="1-1">Tree item 1-1</daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-section value="2">
          <span slot="label">Tree section 2</span>
          <daikin-tree-section value="2-1" open>
            <span slot="label">Tree section 2-1</span>
            <daikin-tree-item value="2-1-1">Tree item 2-1-1</daikin-tree-item>
            <daikin-tree-item value="2-1-2">Tree item 2-1-2</daikin-tree-item>
          </daikin-tree-section>
          <daikin-tree-item value="2-2">Tree item 2-2</daikin-tree-item>
          <daikin-tree-section value="2-3" open>
            <span slot="label">Tree section 2-3</span>
            <daikin-tree-item value="2-3-1">Tree item 2-3-1</daikin-tree-item>
          </daikin-tree-section>
        </daikin-tree-section>
        <daikin-tree-section value="3" disabled>
          <span slot="label">Tree section 3</span>
          <daikin-tree-item value="3-1" disabled>
            Tree item 3-1
          </daikin-tree-item>
        </daikin-tree-section>
        <!-- 'open' is ignored when 'disabled' -->
        <daikin-tree-section value="4" disabled open>
          <span slot="label">Tree section 4</span>
          <daikin-tree-item value="4-1" disabled>
            Tree item 4-1
          </daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-item value="5">Tree item 5</daikin-tree-item>
      </daikin-tree>
    </div>
  `,
};
