import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "./common";
import type { DaikinToastNotificationManagerStoryArgs } from "./common";

export const metadata: Meta<DaikinToastNotificationManagerStoryArgs> = {
  render: ({ position, itemDuration, onClose, isVrt }) =>
    html`<sb-toast-notification-container
      data-testid="toast-notification-container"
      position=${position}
      item-duration=${ifDefined(itemDuration ?? undefined)}
      ?is-vrt=${isVrt}
      @close=${onClose}
    ></sb-toast-notification-container>`,
};
