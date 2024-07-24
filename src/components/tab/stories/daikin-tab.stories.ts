import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TAB_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tab",
  tags: ["autodocs"],
  argTypes: DAIKIN_TAB_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    size: "default",
    active: false,
    disabled: false,
    label: "Tab",
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tab")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "tab", {
      name: "Tab",
    });
    await expect(innerButton).toBeInTheDocument();

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    // should also react if outer button clicked
    await step("Try to outer button", async () => {
      await userEvent.click(root);
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }),
};

export const Condensed: Story = {
  args: {
    ...Default.args,
    size: "condensed",
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tab")[0];
    await expect(root).toBeInTheDocument();

    const innerButton = getByShadowRole(root, "tab", {
      name: "Tab",
    });
    await expect(innerButton).toBeInTheDocument();

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).not.toHaveBeenCalled();
    });

    // also should not react if outer button clicked
    await step("Try to outer button", async () => {
      await userEvent.click(root);
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }),
};

export const Active: Story = {
  args: {
    ...Default.args,
    active: true,
    onClick: fn(),
  },
};
