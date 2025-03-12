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
  component: ({ ...props }: DaikinLoadingStoryArgs) => (
    <div data-testid="vrt-container" className="flex size-fit">
      <div className="flex justify-center items-center size-48">
        <ReactDaikinLoading {...props} />
      </div>
      <div className="flex justify-center items-center size-48 bg-ddt-color-common-neutral-default">
        <ReactDaikinLoading {...props} />
      </div>
    </div>
  ),
};
