import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTileStoryArgs } from "./common";

import "#package/components/tile-tile/daikin-tile-tile";
import "#package/components/tile/daikin-tile";

export const metadata: Meta<DaikinTileStoryArgs> = {
  title: "Components/Tile",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-tile
      ?trailing-slash=${args.trailingSlash}
      overflow=${args.overflow}
    >
      <daikin-tile-tile href="#">DaikinTileTitle1</daikin-tile-tile>
      <daikin-tile-tile href="#">DaikinTileTitle2</daikin-tile-tile>
      <daikin-tile-tile href="#">DaikinTileTitle3</daikin-tile-tile>
      <daikin-tile-tile href="#">DaikinTileTitle4</daikin-tile-tile>
      <daikin-tile-tile href="#">DaikinTileTitle5</daikin-tile-tile>
    </daikin-tile>
  `,
};
