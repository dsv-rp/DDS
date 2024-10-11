import "#package/components/icon/daikin-icon";
import "#package/components/table-header-cell/daikin-table-header-cell";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinTableHeaderCellStoryArgs } from "./common";

export const metadata: Meta<DaikinTableHeaderCellStoryArgs> = {
  render: ({ alignment, sortable, leftIcon, onChangeSort }) => {
    return html`<daikin-table-header-cell
      alignment=${alignment}
      ?sortable=${sortable}
      @change-sort=${onChangeSort}
    >
      Table Header Cell
      ${leftIcon
        ? html`<daikin-icon
            slot="left-icon"
            icon=${leftIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : nothing}
    </daikin-table-header-cell>`;
  },
};
