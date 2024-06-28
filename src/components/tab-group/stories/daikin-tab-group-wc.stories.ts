import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import "../../tab/daikin-tab";
import "../daikin-tab-group";
import type { DaikinTabGroupStoryArgs } from "./common";

const meta = {
  title: "Components/Tab",
  tags: ["autodocs"],
  render: ({ size, value }) => html`
    <daikin-tab-group
      value=${value}
      @beforechange=${action("beforechange")}
      @change=${action("change")}
    >
      <daikin-tab size=${size} value="foo">Foo</daikin-tab>
      <daikin-tab size=${size} value="bar" disabled>Bar</daikin-tab>
      <daikin-tab size=${size} value="baz">Baz</daikin-tab>
    </daikin-tab-group>
  `,
  argTypes: {
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

export { TabGroup } from "./common";
