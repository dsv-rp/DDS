import { createComponent } from "@lit/react";
import React from "react";
import { DaikinButton } from "../daikin-button";

export const ReactDaikinButton = createComponent({
  react: React,
  tagName: "daikin-button",
  elementClass: DaikinButton,
  events: {
    click: "onClick",
  },
});
