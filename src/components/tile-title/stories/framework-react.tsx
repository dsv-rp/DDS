import { DaikinButton } from "#package/components/button/daikin-button";
import DaikinIcon from "#package/components/icon/daikin-icon";
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

export const ReactDaikinIcon = createComponent({
  tagName: "daikin-icon",
  elementClass: DaikinIcon,
  react: React,
});

export const metadata: Meta<DaikinTileTitleStoryArgs> = {
  component: ({ ...props }: DaikinTileTitleStoryArgs) => (
    <div>
      <ReactDaikinTileTitle {...props}>
        <span slot="label">Card Header</span>
      </ReactDaikinTileTitle>
      <ReactDaikinTileTitle {...props}>
        <span slot="label">Card Header</span>
        <a
          slot="link"
          href="#"
          style={{ color: "#0097e0", textDecoration: "underline" }}
        >
          View
        </a>
      </ReactDaikinTileTitle>
      <ReactDaikinTileTitle {...props}>
        <div slot="icon" style={{ color: "#AD0404" }}>
          <ReactDaikinIcon color="current" icon="alarm" />
        </div>
        <span slot="label">Card Header</span>
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
