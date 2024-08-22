import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getByShadowRole,
  getByShadowText,
  queryByShadowRole,
  queryByShadowText,
} from "shadow-dom-testing-library";
import { DAIKIN_NOTIFICATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Notification",
  tags: ["autodocs"],
  argTypes: DAIKIN_NOTIFICATION_ARG_TYPES,
  ...metadata,
};

export const Toast: Story = {
  args: {
    title: "Notification-title",
    description: "Notification-description: Toast",
    variant: "toast",
    status: "positive",
    line: "single",
    open: true,
    closeButton: false,
    __vrtDescription__: "Notification-description: Toast",
    onClose: fn(),
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-notification")[0];
    await expect(root).toBeInTheDocument();

    await step("Title should be visible", async () => {
      const title = getByShadowText(root, "Notification-title");
      await expect(title).toBeInTheDocument();
    });

    await step("Close button should not be visible", async () => {
      const closeButton = queryByShadowRole(root, "button", {
        name: "Close",
      });
      await expect(closeButton).not.toBeInTheDocument();
    });
  }),
};

export const Inline: Story = {
  args: {
    ...Toast.args,
    description: "Notification-description: Inline",
    __vrtDescription__: "Notification-description: Inline",
    variant: "inline",
    onClose: fn(),
  },
};

export const ToastClosable: Story = {
  args: {
    ...Toast.args,
    closeButton: true,
    onClose: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-notification")[0];
    await expect(root).toBeInTheDocument();

    await step("Title should be visible", async () => {
      const title = getByShadowText(root, "Notification-title");
      await expect(title).toBeInTheDocument();
    });

    const closeButton = getByShadowRole(root, "button", {
      name: "Close",
    });
    await expect(closeButton).toBeInTheDocument();
    await expect(args.onClose).not.toHaveBeenCalled();

    await step(
      "`close` event should be emitted when close button clicked",
      async () => {
        await userEvent.click(closeButton);
        await expect(args.onClose).toHaveBeenCalledOnce();
      }
    );

    await step(
      "Notification should disappear after close button clicked",
      async () => {
        const title = queryByShadowText(root, "Notification-title");
        await expect(title).not.toBeInTheDocument();
      }
    );
  }),
};
