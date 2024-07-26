import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTileStoryArgs } from "./common";

import "#package/components/tile-tile/daikin-tile-tile";
import "#package/components/tile/daikin-tile";

export const metadata: Meta<DaikinTileStoryArgs> = {
  title: "Components/Tile",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-tile borderType=${args.borderType}>
      <daikin-tile-title
        slot="header"
        label="Card Header"
        underLine="true"
      ></daikin-tile-title>
    </daikin-tile>
  `,
};
