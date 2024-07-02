import { DaikinButton } from "#package/components/button/daikin-button";
import { createComponent } from "@lit/react";
import React from "react";

export const ReactDaikinButton = createComponent({
  react: React,
  tagName: "daikin-button",
  elementClass: DaikinButton,
  events: {
    click: "onClick",
  },
});
