import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import "../daikin-tab";
import type { DaikinTabStoryArgs } from "./common";

const meta = {
  title: "Components/Tab",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-tab
      size=${args.size}
      ?active=${args.active}
      ?disabled=${args.disabled}
      @click=${action("button-click")}
    >
      ${args.label}
    </daikin-tab>
  `,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "condensed"],
    },
    active: { type: "boolean" },
    disabled: { type: "boolean" },
    label: {
      type: "string",
    },
  },
} satisfies Meta<DaikinTabStoryArgs>;

export default meta;

export { Tab } from "./common";
