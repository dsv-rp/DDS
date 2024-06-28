import { createComponent } from "@lit/react";
import React from "react";

import { DaikinTab } from "../daikin-tab";

export const ReactDaikinTab = createComponent({
  tagName: "daikin-tab",
  elementClass: DaikinTab,
  react: React,
  events: {
    onChange: "change",
  },
});
