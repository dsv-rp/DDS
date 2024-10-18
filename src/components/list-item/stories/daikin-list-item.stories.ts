import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_LIST_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/List Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_LIST_ITEM_ARG_TYPES,
  ...metadata,
};

export const Button: Story = {
  args: {
    type: "button",
    disabled: false,
    label: "List item label",
    action: false,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(queryByShadowRole(root, "link")).not.toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }),
};

export const WithIcon: Story = {
  args: {
    ...Button.args,
    leftIcon: "positive",
    rightIcon: "chevron-right",
    onClick: fn(),
  },
};

export const Link: Story = {
  args: {
    ...Button.args,
    type: "link",
    href: "#",
    onClick: fn((event: Event) => {
      // Prevent navigation
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(queryByShadowRole(root, "button")).not.toBeInTheDocument();

    const innerLink = getByShadowRole(root, "link");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should react if inner link clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }),
};

export const ButtonDisabled: Story = {
  args: {
    ...Button.args,
    disabled: true,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(queryByShadowRole(root, "link")).not.toBeInTheDocument();

    const innerButton = getByShadowRole(root, "button");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledTimes(0);
    });
  }),
};

export const LinkDisabled: Story = {
  args: {
    ...Link.args,
    disabled: true,
    onClick: fn((event: Event) => {
      event.preventDefault();
    }),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(queryByShadowRole(root, "button")).not.toBeInTheDocument();

    const innerLink = getByShadowRole(root, "link");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should not react if inner button clicked
    await step("Try to click inner link", async () => {
      await userEvent.click(innerLink);
      await expect(args.onClick).toHaveBeenCalledTimes(0);
    });
  }),
};

export const TextWithSlot: Story = {
  args: {
    ...Button.args,
    type: "text",
    action: true,
    onClick: fn(),
  },
};
