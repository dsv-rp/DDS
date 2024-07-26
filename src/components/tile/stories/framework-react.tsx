import { DaikinTileTitle } from "#package/components/tile-title/daikin-tile-title";
import { DaikinTile } from "#package/components/tile/daikin-tile";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTileStoryArgs } from "./common";

const ReactDaikinTile = createComponent({
  react: React,
  tagName: "daikin-tile",
  elementClass: DaikinTile,
  events: {},
});

const ReactDaikinTileTitle = createComponent({
  react: React,
  tagName: "daikin-tile-title",
  elementClass: DaikinTileTitle,
  events: {},
});

export const metadata: Meta<DaikinTileStoryArgs> = {
  component: ({ ...props }: DaikinTileStoryArgs) => (
    <ReactDaikinTile {...props}>
      <ReactDaikinTileTitle
        slot="header"
        label="Card Header"
        underLine={true}
      ></ReactDaikinTileTitle>
      <div style={{ height: 307, width: 437 }}></div>
    </ReactDaikinTile>
  ),
};
