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
      <ReactDaikinTileTitle {...props}>
        <span slot="label">Card Header</span>
      </ReactDaikinTileTitle>
      <ReactDaikinTileTitle {...props}>
        <span
          slot="icon"
          style={{ height: 16, width: 16, background: "red" }}
        ></span>
        <span slot="label">Card Header</span>
        <ReactDaikinButton
          slot="action"
          size={"condensed"}
          variant={"secondary"}
        >
          Edit
        </ReactDaikinButton>
        <ReactDaikinButton
          slot="action"
          size={"condensed"}
          variant={"secondary"}
        >
          Edit
        </ReactDaikinButton>
      </ReactDaikinTileTitle>
    </div>
  ),
};
