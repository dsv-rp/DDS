import "#package/components/tree-item/daikin-tree-item";
import "#package/components/tree-section/daikin-tree-section";
import "#package/components/tree/daikin-tree";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTreeStoryArgs } from "./common";

export const metadata: Meta<DaikinTreeStoryArgs> = {
  render: () => html`
    <div style="width:400px;">
      <daikin-tree>
        <daikin-tree-section open>
          <span slot="label">Tree section 1</span>
          <daikin-tree-item>Tree item 1-1</daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-section selected>
          <span slot="label">Tree section 2</span>
          <daikin-tree-section open>
            <span slot="label">Tree section 2-1</span>
            <daikin-tree-item>Tree item 2-1-1</daikin-tree-item>
            <daikin-tree-item>Tree item 2-1-2</daikin-tree-item>
          </daikin-tree-section>
          <daikin-tree-item>Tree item 2-2</daikin-tree-item>
          <daikin-tree-section open>
            <span slot="label">Tree section 2-3</span>
            <daikin-tree-item>Tree item 2-3-1</daikin-tree-item>
          </daikin-tree-section>
        </daikin-tree-section>
        <daikin-tree-section disabled>
          <span slot="label">Tree section 3</span>
          <daikin-tree-item disabled>Tree item 3-1</daikin-tree-item>
        </daikin-tree-section>
        <!-- 'open' is ignored when 'disabled' -->
        <daikin-tree-section disabled open>
          <span slot="label">Tree section 4</span>
          <daikin-tree-item disabled>Tree item 4-1</daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-item>Tree item 5</daikin-tree-item>
      </daikin-tree>
    </div>
  `,
};
