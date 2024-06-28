import { createComponent } from "@lit/react";
import React from "react";

import { DaikinTabGroup } from "../daikin-tab-group";

export const ReactDaikinTabGroup = createComponent({
  tagName: "daikin-tab-group",
  elementClass: DaikinTabGroup,
  react: React,
  events: {
    onBeforeChange: "beforechange",
    onChange: "change",
  },
});
