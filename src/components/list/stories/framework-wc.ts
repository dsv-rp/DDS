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
        <daikin-list-item left-icon="positive" chevron>
          List item label 1
        </daikin-list-item>
        <daikin-list-item type="link" href="#" chevron>
          List item label 2
        </daikin-list-item>
        <daikin-list-item chevron disabled>
          List item label 3
        </daikin-list-item>
        <daikin-list-item chevron>
          List item label 4
          <span slot="action">
            <daikin-checkbox
              label="Label"
              label-position="hidden"
            ></daikin-checkbox>
          </span>
        </daikin-list-item>
      </daikin-list>
    </div>
  `,
};
