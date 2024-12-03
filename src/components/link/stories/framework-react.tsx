import { DaikinLink } from "#package/components/link/daikin-link";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinLinkStoryArgs } from "./common";

export const ReactDaikinLink = createComponent({
  react: React,
  tagName: "daikin-link",
  elementClass: DaikinLink,
});

export const metadata: Meta<DaikinLinkStoryArgs> = {
  component: ({
    label,
    leftIcon,
    rightIcon,
    withSentence,
    ...props
  }: DaikinLinkStoryArgs) => {
    const Link = ({ overrideLabel }: { overrideLabel?: string }) => (
      <ReactDaikinLink {...props}>
        {leftIcon && (
          <ReactDaikinIcon
            slot="left-icon"
            icon={leftIcon}
            size="current"
            color="current"
          />
        )}
        {overrideLabel ?? label}
        {rightIcon && (
          <ReactDaikinIcon
            slot="right-icon"
            icon={rightIcon}
            size="current"
            color="current"
          />
        )}
      </ReactDaikinLink>
    );

    if (withSentence) {
      return (
        <p
          style={{
            width: "400px",
            margin: 0,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Here, we are using a long sentence. If you use the link component,{" "}
          <Link overrideLabel="even links within sentences will respond correctly to line breaks and other elements," />{" "}
          and will work.
        </p>
      );
    }

    return <Link />;
  },
};
