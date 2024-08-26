import { addons } from "@storybook/manager-api";
import daikinTheme from "./daikin-theme";
import "./manager.css";

addons.setConfig({
  theme: daikinTheme,
});
