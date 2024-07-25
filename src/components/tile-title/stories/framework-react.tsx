import { DaikinTileTitle } from "#package/components/tile-title/daikin-tile-title";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTileTitleStoryArgs } from "./common";

const ReactDaikinTileTitle = createComponent({
  react: React,
  tagName: "daikin-tile-title",
  elementClass: DaikinTileTitle,
  events: {},
});

export const metadata: Meta<DaikinTileTitleStoryArgs> = {
  component: ({ ...props }: DaikinTileTitleStoryArgs) => (
    <ReactDaikinTileTitle {...props}>DaikinTileTitle1</ReactDaikinTileTitle>
  ),
};
