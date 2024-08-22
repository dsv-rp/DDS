import "#package/components/pagination/daikin-pagination";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationStoryArgs> = {
  render: ({ currentPage, lastPage, pageWindow }) => html`
    <div id="storyWrap" style="width: 600px; height: 300px">
      <daikin-pagination
        current-page=${currentPage}
        last-page=${lastPage}
        page-window=${pageWindow}
      >
      </daikin-pagination>
    </div>
  `,
};
