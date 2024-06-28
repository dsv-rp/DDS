import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import "../../tab/daikin-tab";
import "../daikin-tab-group";
import { parseTab, type DaikinTabGroupStoryArgs } from "./common";

const meta = {
  title: "Components/TabGroup",
  tags: ["autodocs"],
  render: ({ tabs, size, value }) => html`
    <daikin-tab-group
      value=${value}
      @beforechange=${action("beforechange")}
      @change=${action("change")}
      style="max-width:600px;overflow:auto;"
    >
      ${tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return html`<daikin-tab value=${value} ?disabled=${disabled}>
          ${label}
        </daikin-tab>`;
      })}
    </daikin-tab-group>
  `,
  argTypes: {
    tabs: {
      control: { type: "object" },
    },
    size: {
      control: { type: "select" },
      options: ["default", "condensed"],
    },
    value: {
      type: "string",
    },
  },
} satisfies Meta<DaikinTabGroupStoryArgs>;

export default meta;

export { TabGroup, TabGroupSingle, TabGroupMany } from "./common";
