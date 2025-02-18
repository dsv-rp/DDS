import "#package/components/button/daikin-button";
import "#package/components/card-footer/daikin-card-footer";
import "#package/components/card-header/daikin-card-header";
import "#package/components/card/daikin-card";
import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinCardStoryArgs } from "./common";

export const metadata: Meta<DaikinCardStoryArgs> = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: ({ outline, withBody, withFooter }) => html`
    <daikin-card
      ?outline=${outline}
      style="width: max-content; height: max-content;"
    >
      <daikin-card-header>
        <daikin-icon slot="left-icon" icon="alarm" size="xl" color="current">
        </daikin-icon>
        <span>Card title</span>
        <span slot="description">Card description</span>
      </daikin-card-header>
      ${withBody
        ? html`<div style="width: 248px; height: 173px;"></div>`
        : nothing}
      ${withFooter
        ? html`<daikin-card-footer>
            <daikin-button size="small">Button</daikin-button>
          </daikin-card-footer>`
        : nothing}
    </daikin-card>
  `,
};
