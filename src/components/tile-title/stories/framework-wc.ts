import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTileTitleStoryArgs } from "./common";

import "#package/components/tile-title/daikin-tile-title";

export const metadata: Meta<DaikinTileTitleStoryArgs> = {
  title: "Components/TileTitle",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-tile-title label=${args.label} ?with-under-line=${args.underLine}>
    </daikin-tile-title>
  `,
};
