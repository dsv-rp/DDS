import "#package/components/pagination/daikin-pagination";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinPaginationStoryArgs } from "./common";

export const metadata: Meta<DaikinPaginationStoryArgs> = {
  render: ({ disabled, size, checked, onChange, onClick }) => html`
    <daikin-pagination
      ?disabled=${disabled}
      size=${size}
      ?checked=${checked}
      @change=${onChange}
      @click=${onClick}
    >
    </daikin-pagination>
  `,
};
