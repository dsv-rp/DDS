import "#package/components/pagination-overflow/daikin-pagination-overflow";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationOverflowStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationOverflowStoryArgs> = {
  render: ({ value, max, totalItems }) => html`
    <div id="storyWrap" style="width:400px; height:200px">
      <daikin-pagination-overflow
        value=${value}
        max=${max}
        total-items=${totalItems}
      >
      </daikin-pagination-overflow>
    </div>
  `,
};
