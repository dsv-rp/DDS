import { DaikinAccordion } from "#package/components/accordion/daikin-accordion";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinAccordionItem } from "../../accordion-item/stories/framework-react";
import type { DaikinAccordionStoryArgs } from "./common";

const ReactDaikinAccordion = createComponent({
  tagName: "daikin-accordion",
  elementClass: DaikinAccordion,
  react: React,
});

export const metadata: Meta<DaikinAccordionStoryArgs> = {
  component: ({ ...props }: DaikinAccordionStoryArgs) => (
    <ReactDaikinAccordion {...props}>
      <ReactDaikinAccordionItem title="Accordion-1-title">
        Accordion-1-content
      </ReactDaikinAccordionItem>
      <ReactDaikinAccordionItem title="Accordion-2-title" detailsOpen>
        Accordion-2-content
      </ReactDaikinAccordionItem>
      <ReactDaikinAccordionItem title="Accordion-3-title" disabled>
        Accordion-3-content
      </ReactDaikinAccordionItem>
      <ReactDaikinAccordionItem title="Accordion-4-title" detailsOpen disabled>
        Accordion-4-content
      </ReactDaikinAccordionItem>
    </ReactDaikinAccordion>
  ),
};
