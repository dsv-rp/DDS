import { createComponent } from "@lit/react";
import React from "react";

import { DaikinCheckbox } from "../daikin-checkbox";

export const ReactDaikinCheckbox = createComponent({
  tagName: "daikin-checkbox",
  elementClass: DaikinCheckbox,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
  },
});
