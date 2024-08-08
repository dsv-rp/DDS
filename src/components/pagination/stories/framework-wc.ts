import "#package/components/pagination/daikin-pagination";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationStoryArgs> = {
  render: ({ value, max, showPages }) => html`
    <daikin-pagination
      value=${value}
      max=${max}
      show-pages=${showPages}
    ></daikin-pagination>
  `,
};
