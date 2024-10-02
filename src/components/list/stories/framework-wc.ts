import "#package/components/checkbox/daikin-checkbox";
import "#package/components/list-item/daikin-list-item";
import "#package/components/list/daikin-list";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinListStoryArgs } from "./common";

export const metadata: Meta<DaikinListStoryArgs> = {
  render: () => html`
    <div style="width:256px;">
      <daikin-list>
        <daikin-list-item left-icon="positive" right-icon="chevron-right">
          List item label 1
        </daikin-list-item>
        <daikin-list-item type="link" href="#">
          List item label 2 (Link)
        </daikin-list-item>
        <daikin-list-item disabled>List item label 3</daikin-list-item>
        <daikin-list-item>
          List item label 4
          <daikin-checkbox
            label="Label"
            label-position="hidden"
            slot="action"
          ></daikin-checkbox>
        </daikin-list-item>
        <daikin-list-item right-icon="chevron-right">
          Multiple lines of the list item label
        </daikin-list-item>
      </daikin-list>
    </div>
  `,
};
