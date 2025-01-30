import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent, waitFor } from "@storybook/test";
import {
  getAllByShadowRole,
  getByShadowRole,
  getByShadowText,
  queryByShadowText,
} from "shadow-dom-testing-library";
import {
  DAIKIN_TOAST_NOTIFICATION_MANAGER_ARG_TYPES,
  type Story,
} from "./common";

export default {
  title: "Components/Toast Notification Manager",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOAST_NOTIFICATION_MANAGER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    position: "bottom-right",
    onClose: fn(),
  },
};

export const AutomationClose: Story = {
  args: {
    ...Default.args,
    itemDuration: 3000,
    onClose: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement;
    await expect(root).toBeInTheDocument();

    const button = getByShadowRole(root, "button", {
      name: "View new toast",
    });
    await expect(button).toBeInTheDocument();

    await step(
      "Should disappear the toast when click the close button",
      async () => {
        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);
        await waitFor(() =>
          expect(getByShadowText(root, "New toast 1")).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(getByShadowText(root, "New toast 2")).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(getByShadowText(root, "New toast 3")).toBeInTheDocument()
        );

        await userEvent.click(
          getAllByShadowRole(root, "button", {
            name: "Close",
          })[1]
        );
        await waitFor(() =>
          expect(queryByShadowText(root, "New toast 2")).not.toBeInTheDocument()
        );
        await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(1));

        await userEvent.click(
          getAllByShadowRole(root, "button", {
            name: "Close",
          })[0]
        );
        await waitFor(() =>
          expect(queryByShadowText(root, "New toast 3")).not.toBeInTheDocument()
        );
        await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(2));
      }
    );

    await step(
      "Should disappear automatically the toast after a certain amount of time has passed",
      async () => {
        button.blur();

        await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(3), {
          timeout: 3500,
        });
      }
    );
  }),
};
