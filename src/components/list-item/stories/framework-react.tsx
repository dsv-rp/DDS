import { DaikinListItem } from "#package/components/list-item/daikin-list-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinListItemStoryArgs } from "./common";

export const ReactDaikinListItem = createComponent({
  tagName: "daikin-list-item",
  elementClass: DaikinListItem,
  react: React,
});

export const metadata: Meta<DaikinListItemStoryArgs> = {
  component: ({ ...props }: DaikinListItemStoryArgs) => (
    <ReactDaikinListItem {...props}>List item label</ReactDaikinListItem>
  ),
};