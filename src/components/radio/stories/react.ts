import { createComponent } from "@lit/react";
import React from "react";

import DaikinRadio from "../daikin-radio";

export const ReactDaikinRadio = createComponent({
  tagName: "daikin-radio",
  elementClass: DaikinRadio,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
  },
});
