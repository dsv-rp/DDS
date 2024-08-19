import "#package/components/pagination-overflow/daikin-pagination-overflow";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationOverflowStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationOverflowStoryArgs> = {
  render: ({ value, max, totalItems }) => html`
    <daikin-pagination
      value=${value}
      max=${max}
      show-pages=${totalItems}
    ></daikin-pagination>
  `,
};
