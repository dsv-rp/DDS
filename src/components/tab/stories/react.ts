import { createComponent } from "@lit/react";
import React from "react";

import { DaikinTab } from "../daikin-tab";
import { DaikinTabGroup } from "../daikin-tab-group";

export const ReactDaikinTab = createComponent({
  tagName: "daikin-tab",
  elementClass: DaikinTab,
  react: React,
  events: {
    onChange: "change",
  },
});

export const ReactDaikinTabGroup = createComponent({
  tagName: "daikin-tab-group",
  elementClass: DaikinTabGroup,
  react: React,
  events: {
    onBeforeChange: "beforechange",
    onChange: "change",
  },
});
