import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTileTitleStoryArgs } from "./common";

import "#package/components/button/daikin-button";
import "#package/components/icon/daikin-icon";
import "#package/components/tile-title/daikin-tile-title";

export const metadata: Meta<DaikinTileTitleStoryArgs> = {
  title: "Components/TileTitle",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-tile-title ?with-under-line=${args.underLine}>
      <span slot="label">Card Header</span>
    </daikin-tile-title>
    <daikin-tile-title ?with-under-line=${args.underLine}>
      <span slot="label">Card Header</span>
      <a
        slot="link"
        href="#"
        style="color: #0097e0; text-decoration: underline"
      >
        View
      </a>
    </daikin-tile-title>
    <daikin-tile-title ?with-under-line=${args.underLine}>
      <div slot="icon">
        <daikin-icon color="current" icon="alarm"></daikin-icon>
      </div>
      <span slot="label">Card Header</span>
      <daikin-button slot="action" size="condensed" variant="secondary">
        Edit
      </daikin-button>
    </daikin-tile-title>
  `,
};
