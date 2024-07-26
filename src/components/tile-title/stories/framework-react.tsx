import { DaikinButton } from "#package/components/button/daikin-button";
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

const ReactDaikinButton = createComponent({
  react: React,
  tagName: "daikin-button",
  elementClass: DaikinButton,
  events: {},
});

export const metadata: Meta<DaikinTileTitleStoryArgs> = {
  component: ({ ...props }: DaikinTileTitleStoryArgs) => (
    <div>
      <ReactDaikinTileTitle {...props}></ReactDaikinTileTitle>
      <ReactDaikinTileTitle {...props}>
        <ReactDaikinButton
          slot="button"
          size={"condensed"}
          variant={"secondary"}
        >
          Edit
        </ReactDaikinButton>
      </ReactDaikinTileTitle>
    </div>
  ),
};
