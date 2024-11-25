import "#package/components/pagination/daikin-pagination";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationStoryArgs> = {
  render: ({ current, total, window, onChange, onClick }) => html`
    <div id="storyWrap" style="width: 600px; height: 300px">
      <daikin-pagination
        current=${current}
        total=${total}
        window=${window}
        @change=${onChange}
        @click=${onClick}
      >
      </daikin-pagination>
    </div>
  `,
};
