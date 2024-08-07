import { createComponent } from "@lit/react";
import React from "react";
import DaikinInputGroup from "../daikin-input-group";

export const ReactDaikinInputGroup = createComponent({
  tagName: "daikin-input-group",
  elementClass: DaikinInputGroup,
  react: React,
});
