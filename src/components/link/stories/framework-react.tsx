import { DaikinLink } from "#package/components/link/daikin-link";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinLinkLocalParameters, DaikinLinkStoryArgs } from "./common";

export const ReactDaikinLink = createComponent({
  react: React,
  tagName: "daikin-link",
  elementClass: DaikinLink,
});

export const metadata: Meta<DaikinLinkStoryArgs> = {
  decorators: [
    (Story, { parameters }) => {
      const local = parameters._ddsLocal as
        | DaikinLinkLocalParameters
        | undefined;

      if (local?.withSentence) {
        return (
          <p className="w-[400px] text-ddt-color-common-text-primary p-0 m-0 font-daikinSerif">
            Here, we are using a long sentence. If you use the link component,{" "}
            <Story /> and will work.
          </p>
        );
      }

      return <Story />;
    },
  ],
  component: ({
    label,
    leftIcon,
    rightIcon,
    ...props
  }: DaikinLinkStoryArgs) => (
    <ReactDaikinLink {...props}>
      {leftIcon && (
        <ReactDaikinIcon
          slot="left-icon"
          icon={leftIcon}
          size="current"
          color="current"
        />
      )}
      {label}
      {rightIcon && (
        <ReactDaikinIcon
          slot="right-icon"
          icon={rightIcon}
          size="current"
          color="current"
        />
      )}
    </ReactDaikinLink>
  ),
};
