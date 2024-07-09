import "#package/components/tab-group/daikin-tab-group";
import "#package/components/tab/daikin-tab";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { parseTab, type DaikinTabGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinTabGroupStoryArgs> = {
  render: ({ value, size, tabs, onBeforeChange, onChange }) => html`
    <daikin-tab-group
      value=${value}
      style="max-width:600px;overflow:auto;"
      @beforechange=${onBeforeChange}
      @change=${onChange}
    >
      ${tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return html`<daikin-tab
          size=${size}
          value=${value}
          ?disabled=${disabled}
        >
          ${label}
        </daikin-tab>`;
      })}
    </daikin-tab-group>
  `,
};
