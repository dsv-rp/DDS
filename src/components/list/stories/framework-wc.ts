import "#package/components/list-item/daikin-list-item";
import "#package/components/list/daikin-list";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../checkbox/daikin-checkbox";
import type { DaikinListStoryArgs } from "./common";

export const metadata: Meta<DaikinListStoryArgs> = {
  render: () => html`
    <div style="width:256px;">
      <daikin-list>
        <daikin-list-item
          label="List item label 1"
          left-icon="positive"
          right-arrow
        ></daikin-list-item>
        <daikin-list-item
          label="List item label 2"
          type="link"
          href="#"
          right-arrow
        ></daikin-list-item>
        <daikin-list-item
          label="List item label 3"
          disabled
          right-arrow
        ></daikin-list-item>
        <daikin-list-item label=" List item label 4" right-arrow>
          <daikin-checkbox
            label="Label"
            label-position="hidden"
          ></daikin-checkbox>
        </daikin-list-item>
      </daikin-list>
    </div>
  `,
};
