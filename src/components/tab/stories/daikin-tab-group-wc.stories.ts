import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import "../daikin-tab-group";
import type { DaikinTabGroupStoryArgs } from "./common";

const meta = {
  title: "Components/Tab",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-tab-group
      value=${args.value}
      @beforechange=${action("beforechange")}
      @change=${action("change")}
    >
      <daikin-tab value="foo">Foo</daikin-tab>
      <daikin-tab value="bar">Bar</daikin-tab>
      <daikin-tab value="baz">Baz</daikin-tab>
    </daikin-tab-group>
  `,
  argTypes: {
    value: {
      type: "string",
    },
  },
} satisfies Meta<DaikinTabGroupStoryArgs>;

export default meta;

export { TabGroup } from "./common";
