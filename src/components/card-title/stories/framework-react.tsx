import { ReactDaikinButton } from "#package/components/button/stories/framework-react";
import { DaikinCardTitle } from "#package/components/card-title/daikin-card-title";
import { ReactDaikinIcon } from "#package/components/icon/stories/framework-react";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinCardTitleStoryArgs } from "./common";

const ReactDaikinCardTitle = createComponent({
  react: React,
  tagName: "daikin-card-title",
  elementClass: DaikinCardTitle,
  events: {},
});

export const metadata: Meta<DaikinCardTitleStoryArgs> = {
  component: ({ ...props }: DaikinCardTitleStoryArgs) => (
    <div data-testid="cardTitleArea">
      <ReactDaikinCardTitle {...props}>
        <span slot="label">Card Header</span>
      </ReactDaikinCardTitle>
      <ReactDaikinCardTitle {...props}>
        <span slot="label">Card Header</span>
        <a
          slot="link"
          href="#"
          style={{ color: "#0097e0", textDecoration: "underline" }}
        >
          View
        </a>
      </ReactDaikinCardTitle>
      <ReactDaikinCardTitle {...props}>
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
      </ReactDaikinCardTitle>
    </div>
  ),
};
