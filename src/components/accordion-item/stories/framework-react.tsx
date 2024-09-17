import { DaikinAccordionItem } from "#package/components/accordion-item/daikin-accordion-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinAccordionItemStoryArgs } from "./common";

export const ReactDaikinAccordionItem = createComponent({
  tagName: "daikin-accordion-item",
  elementClass: DaikinAccordionItem,
  react: React,
});

export const metadata: Meta<DaikinAccordionItemStoryArgs> = {
  component: ({ ...props }: DaikinAccordionItemStoryArgs) => (
    <ReactDaikinAccordionItem {...props}>
      Accordion content
    </ReactDaikinAccordionItem>
  ),
};
