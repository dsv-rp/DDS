import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "./common";
import type { DaikinToastManagerStoryArgs } from "./common";

export const metadata: Meta<DaikinToastManagerStoryArgs> = {
  render: ({ position, duration, onClose, isVrt }) =>
    html`<daikin-toast-notification-container
      position=${position}
      duration=${ifDefined(duration ?? undefined)}
      ?is-vrt=${isVrt}
      @close=${onClose}
    ></daikin-toast-notification-container>`,
};
