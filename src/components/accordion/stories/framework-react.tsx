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
    <div
      style={{
        width: "256px",
      }}
    >
      <ReactDaikinAccordion {...props}>
        <ReactDaikinAccordionItem title="Accordion heading 1">
          Accordion content 1
        </ReactDaikinAccordionItem>
        <ReactDaikinAccordionItem title="Accordion heading 2" open>
          Accordion content 2
        </ReactDaikinAccordionItem>
        <ReactDaikinAccordionItem title="Accordion heading 3" disabled>
          Accordion content 3
        </ReactDaikinAccordionItem>
        <ReactDaikinAccordionItem title="Accordion heading 4" open disabled>
          Accordion content 4
        </ReactDaikinAccordionItem>
      </ReactDaikinAccordion>
    </div>
  ),
};
