import { DaikinAccordion } from "#package/components/accordion/daikin-accordion";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinAccordionStoryArgs } from "./common";

export const ReactDaikinAccordion = createComponent({
  tagName: "daikin-accordion",
  elementClass: DaikinAccordion,
  react: React,
  events: {
    close: "onClose",
  },
});

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  component: ({ ...props }: DaikinAccordionStoryArgs) => (
    <ReactDaikinAccordion {...props}>Accordion-content</ReactDaikinAccordion>
  ),
};
