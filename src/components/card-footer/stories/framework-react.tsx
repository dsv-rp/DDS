import { DaikinCardFooter } from "#package/components/card-footer/daikin-card-footer";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import { ReactDaikinLink } from "../../link/stories/framework-react";
import type { DaikinCardFooterStoryArgs } from "./common";

export const ReactDaikinCardFooter = createComponent({
  react: React,
  tagName: "daikin-card-Footer",
  elementClass: DaikinCardFooter,
  events: {},
});

export const metadata: Meta<DaikinCardFooterStoryArgs> = {
  component: ({ ...props }: DaikinCardFooterStoryArgs) => (
    <ReactDaikinCardFooter {...props}>
      {props.actionType === "button" ? (
        <ReactDaikinButton size="small">Button</ReactDaikinButton>
      ) : (
        <ReactDaikinLink href="https://dsv-rp.github.io/DDS">
          Link
        </ReactDaikinLink>
      )}
    </ReactDaikinCardFooter>
  ),
};
