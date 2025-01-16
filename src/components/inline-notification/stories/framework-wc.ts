import "#package/components/button/daikin-button";
import "#package/components/inline-notification/daikin-inline-notification";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinInlineNotificationStoryArgs } from "./common";

export const metadata: Meta<DaikinInlineNotificationStoryArgs> = {
  render: ({
    open,
    status,
    layout,
    closable,
    timestamp,
    slotTitle,
    slotDescription,
    slotAction,
    onClose,
  }) => html`
    <daikin-inline-notification
      layout=${layout}
      status=${status}
      ?open=${open}
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
    </daikin-inline-notification>
  `,
};
