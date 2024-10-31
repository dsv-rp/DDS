import "#package/components/checkbox/daikin-checkbox";
import "#package/components/list-item/daikin-list-item";
import "#package/components/list/daikin-list";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinListStoryArgs } from "./common";

export const metadata: Meta<DaikinListStoryArgs> = {
  render: () => html`
    <div style="width:360px;">
      <daikin-list>
        <daikin-list-item>
          List item label 1
          <span slot="left-icon" style="color:#414141;">
            <daikin-icon
              slot="left-icon"
              icon="positive"
              size="xl"
              color="current"
            ></daikin-icon>
          </span>
          <span slot="right-icon" style="color:#414141;">
            <daikin-icon
              icon="chevron-right"
              size="xl"
              color="current"
            ></daikin-icon>
          </span>
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
      </daikin-list>
    </div>
  `,
};
