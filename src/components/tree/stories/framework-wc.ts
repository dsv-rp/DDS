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
        <daikin-tree-section label="Tree section 1" open>
          <daikin-tree-item>Tree item 1-1</daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-section label="Tree section 2" selected>
          <daikin-tree-section label="Tree section 2-1" open>
            <daikin-tree-item>Tree item 2-1-1</daikin-tree-item>
            <daikin-tree-item>Tree item 2-1-2</daikin-tree-item>
          </daikin-tree-section>
          <daikin-tree-item>Tree item 2-2</daikin-tree-item>
          <daikin-tree-section label="Tree section 2-3" open>
            <daikin-tree-item>Tree item 2-3-1</daikin-tree-item>
          </daikin-tree-section>
        </daikin-tree-section>
        <daikin-tree-section label="Tree section 3" disabled>
          <daikin-tree-item>Tree item 3-1</daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-section label="Tree section 4" disabled open>
          <daikin-tree-item>Tree item 4-1</daikin-tree-item>
        </daikin-tree-section>
        <daikin-tree-item>Tree item 5</daikin-tree-item>
      </daikin-tree>
    </div>
  `,
};
