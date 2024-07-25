import { DaikinTileTitle } from "#package/components/tile-title/daikin-tile-title";
import { DaikinTile } from "#package/components/tile/daikin-tile";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTileStoryArgs } from "./common";

const ReactDaikinTile = createComponent({
  react: React,
  tagName: "daikin-title",
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
      <ReactDaikinTileTitle></ReactDaikinTileTitle>
    </ReactDaikinTile>
  ),
};
