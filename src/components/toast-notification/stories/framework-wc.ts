import "#package/components/button/daikin-button";
import "#package/components/toast-notification/daikin-toast-notification";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinToastNotificationStoryArgs } from "./common";

export const metadata: Meta<DaikinToastNotificationStoryArgs> = {
  render: ({
    name,
    status,
    line,
    closable,
    timestamp,
    slotTitle,
    slotDescription,
    slotAction,
    onClose,
  }) => html`
    <daikin-toast-notification
      name=${name}
      status=${status}
      line=${line}
      ?closable=${closable}
      ?timestamp=${timestamp}
      @close=${onClose}
    >
      <span slot="title">${slotTitle}</span>
      <span slot="description">${slotDescription}</span>
      ${slotAction
        ? html`<daikin-button
            slot="action"
            style="flex:none; height:40px;"
            size="small"
            >Execute</daikin-button
          >`
        : nothing}
    </daikin-toast-notification>
  `,
};
