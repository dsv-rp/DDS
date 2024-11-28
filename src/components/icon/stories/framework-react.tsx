import { DaikinIcon } from "#package/components/icon/daikin-icon";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinIconStoryArgs } from "./common";

export const ReactDaikinIcon = createComponent({
  tagName: "daikin-icon",
  elementClass: DaikinIcon,
  react: React,
});

export const metadata: Meta<DaikinIconStoryArgs> = {
  component: ({ ...props }: DaikinIconStoryArgs) => (
    <div style={{ color: "#0097e0", width: "240px", height: "240px" }}>
      <ReactDaikinIcon {...props} />
    </div>
  ),
};
