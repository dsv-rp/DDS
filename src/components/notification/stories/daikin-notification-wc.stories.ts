import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import "../daikin-notification.ts";
import type { DaikinNotificationStoryArgs } from "./common.ts";

const meta = {
  title: "Components/Notification",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-notification
      title=${ifDefined(args.title)}
      description=${args.description}
      variant=${ifDefined(args.variant)}
      status=${ifDefined(args.status)}
      line=${ifDefined(args.line)}
      ?open=${args.open}
      ?closeButton=${args.closeButton}
      @close=${action("close")}
    >
    </daikin-notification>
  `,
  argTypes: {
    title: {
      description: "Title text",
      type: "string",
    },
    description: {
      description: "Description text",
      type: "string",
    },
    variant: {
      description: "Type of notification",
      defaultValue: "toast",
      control: { type: "radio" },
      options: ["toast", "inline"],
    },
    status: {
      description: "Status of notification",
      defaultValue: "positive",
      control: { type: "radio" },
      options: ["positive", "negative", "warning", "alarm", "information"],
    },
    line: {
      description: "Display in single or multiple lines",
      defaultValue: "single",
      control: { type: "radio" },
      options: ["single", "multi"],
    },
    open: {
      description: "Whether the component is open",
      defaultValue: true,
      type: "boolean",
    },
    closeButton: {
      description: "Whether to display the close button",
      defaultValue: false,
      type: "boolean",
    },
  },
} satisfies Meta<DaikinNotificationStoryArgs>;

export default meta;

export { Inline, Toast } from "./common.ts";
