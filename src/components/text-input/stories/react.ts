import { createComponent } from "@lit/react";
import React from "react";
import DaikinTextInput from "../daikin-text-input";

export const ReactDaikinTextInput = createComponent({
  tagName: "daikin-text-input",
  elementClass: DaikinTextInput,
  react: React,
  events: {
    onChange: "change",
    onInput: "input",
    onKeydown: "keydown",
  },
});
