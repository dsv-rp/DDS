import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCardTitleStoryArgs } from "./common";

import "#package/components/button/daikin-button";
import "#package/components/card-title/daikin-card-title";
import "#package/components/icon/daikin-icon";

export const metadata: Meta<DaikinCardTitleStoryArgs> = {
  title: "Components/CardTitle",
  tags: ["autodocs"],
  render: (args) => html`
    <div data-testid="cardTitleArea">
      <daikin-card-title ?underline=${args.underline}>
        <span slot="label">Card Header</span>
      </daikin-card-title>
      <daikin-card-title ?underline=${args.underline}>
        <span slot="label">Card Header</span>
        <a
          slot="link"
          href="#"
          style="color: #0097e0; text-decoration: underline"
        >
          View
        </a>
      </daikin-card-title>
      <daikin-card-title ?underline=${args.underline}>
        <div slot="icon" style="color: #AD0404">
          <daikin-icon slot="icon" color="current" icon="alarm"></daikin-icon>
        </div>
        <span slot="label">Card Header</span>
        <daikin-button slot="action" size="condensed" variant="secondary">
          Edit
        </daikin-button>
      </daikin-card-title>
    </div>
  `,
};
