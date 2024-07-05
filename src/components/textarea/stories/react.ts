import { createComponent } from "@lit/react";
import React from "react";
import DaikinTextarea from "../daikin-textarea";

export const ReactDaikinTextarea = createComponent({
  tagName: "daikin-textarea",
  elementClass: DaikinTextarea,
  react: React,
  events: {
    onChange: "change",
    onInput: "input",
    onKeydown: "keydown",
  },
});
