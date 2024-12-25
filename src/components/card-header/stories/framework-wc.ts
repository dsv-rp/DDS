import "#package/components/card-header/daikin-card-header";
import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinCardHeaderStoryArgs } from "./common";

export const metadata: Meta<DaikinCardHeaderStoryArgs> = {
  title: "Components/CardHeader",
  tags: ["autodocs"],
  render: (args) => html`
    <div style="width: 248px">
      <daikin-card-header>
        ${args.leftIcon
          ? html`<daikin-icon
              slot="left-icon"
              icon=${args.leftIcon}
              size="current"
              color="current"
            ></daikin-icon>`
          : nothing}
        <span>${args.label}</span>
        ${args.description
          ? html`<span slot="description">${args.description}</span>`
          : nothing}
      </daikin-card-header>
    </div>
  `,
};
