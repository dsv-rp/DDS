import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCardStoryArgs } from "./common";

import "#package/components/card-title/daikin-card-title";
import "#package/components/card/daikin-card";

export const metadata: Meta<DaikinCardStoryArgs> = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-card border-type=${args.borderType}>
      <daikin-card-title slot="header" ?under-line=${true}>
        <span slot="label">Card Header</span>
      </daikin-card-title>
    </daikin-card>
  `,
};
