import { DaikinListItem } from "#package/components/list-item/daikin-list-item";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinListItemStoryArgs } from "./common";

export const ReactDaikinListItem = createComponent({
  tagName: "daikin-list-item",
  elementClass: DaikinListItem,
  react: React,
  events: {
    onClick: "click" as EventName<MouseEvent>,
  },
});

export const metadata: Meta<DaikinListItemStoryArgs> = {
  component: ({ ...props }: DaikinListItemStoryArgs) => (
    <ReactDaikinListItem {...props}>List item label</ReactDaikinListItem>
  ),
};
