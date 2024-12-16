import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCardStoryArgs } from "./common";

import "#package/components/button/daikin-button";
import "#package/components/card-footer/daikin-card-footer";
import "#package/components/card-header/daikin-card-header";
import "#package/components/card/daikin-card";
import "#package/components/icon/daikin-icon";

export const metadata: Meta<DaikinCardStoryArgs> = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-card .outline=${args.outline}>
      <daikin-card-header>
        <daikin-icon
          slot="left-icon"
          icon="alarm"
          size="xl"
          color="current"
        ></daikin-icon
        >>
        <span slot="label">Card Header</span>
      </daikin-card-header>
      ${args.withBody && html`<div style="height: 173px; width: 248px"></div>`}
      ${args.withFooter &&
      html`<daikin-card-footer>
        <daikin-button size="small">Button</daikin-button>
      </daikin-card-footer>`}
    </daikin-card>
  `,
};
