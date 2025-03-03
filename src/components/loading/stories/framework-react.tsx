import { DaikinLoading } from "#package/components/loading/daikin-loading";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinLoadingStoryArgs } from "./common";

export const ReactDaikinLoading = createComponent({
  tagName: "daikin-loading",
  elementClass: DaikinLoading,
  react: React,
});

export const metadata: Meta<DaikinLoadingStoryArgs> = {
  component: ({ isVrt, ...props }: DaikinLoadingStoryArgs) => (
    <div
      data-testid="vrt-container"
      className={
        isVrt ? "size-fit p-1 bg-ddt-color-common-neutral-default" : "size-fit"
      }
    >
      <ReactDaikinLoading {...props} />
    </div>
  ),
};
