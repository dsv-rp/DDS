import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinCardHeaderStoryArgs } from "./common";

import "#package/components/card-header/daikin-card-header";
import "#package/components/icon/daikin-icon";

export const metadata: Meta<DaikinCardHeaderStoryArgs> = {
  title: "Components/CardHeader",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-card-header>
      ${args.leftIcon
        ? html`<daikin-icon
            slot="left-icon"
            icon=${args.leftIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : nothing}
      <span>${args.label}</span>
      <span slot="description">${args.description}</span>
    </daikin-card-header>
  `,
};
