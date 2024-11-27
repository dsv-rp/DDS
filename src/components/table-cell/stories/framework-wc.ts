import "#package/components/table-cell/daikin-table-cell";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinTableCellStoryArgs } from "./common";

export const metadata: Meta<DaikinTableCellStoryArgs> = {
  render: ({ alignment, subtitle }) => {
    return html`<daikin-table-cell alignment=${alignment}>
      Table cell label
      ${subtitle ? html`<span slot="subtitle">${subtitle}</span>` : nothing}
    </daikin-table-cell>`;
  },
};
