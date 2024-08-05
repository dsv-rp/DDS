import "#package/components/table/daikin-table";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTableStoryArgs } from "./common";

export const metadata: Meta<DaikinTableStoryArgs> = {
  render: ({ headers, rows }) =>
    html`<daikin-table .headers=${headers} .rows=${rows}></daikin-table>`,
};
