import "#package/components/pagination/daikin-pagination";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationStoryArgs> = {
  render: ({ value, max, showPages }) => html`
    <div id="storyWrap" style="width: 600px; height: 300px">
      <daikin-pagination value=${value} max=${max} show-pages=${showPages}>
      </daikin-pagination>
    </div>
  `,
};
