import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import {
  getByShadowRole,
  getByShadowText,
  queryByShadowText,
} from "shadow-dom-testing-library";
import { DAIKIN_INPUT_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Input Group",
  tags: ["autodocs"],
  argTypes: DAIKIN_INPUT_GROUP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    content: "TextInput",
    label: "Label text",
    helper: "Helper text",
    disabled: false,
    required: false,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-input-group")[0];
    await expect(root).toBeInTheDocument();

    const innerInput: HTMLInputElement = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("Value");

    // should react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(innerInput).toHaveValue("ValueExample");
    });

    innerInput.value = "Value";
    innerInput.blur();
  }),
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-input-group")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("Value");

    // should not react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(innerInput).toHaveValue("Value");
    });

    innerInput.blur();
  }),
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: "Error text",
  },
};

export const Textarea: Story = {
  args: {
    ...Default.args,
    content: "Textarea",
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-input-group")[0];
    await expect(root).toBeInTheDocument();

    const innerInput: HTMLInputElement = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("");
    await expect(getByShadowText(root, "0/100")).toBeInTheDocument();

    // has counter
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(getByShadowText(root, "7/100")).toBeInTheDocument();
      await expect(queryByShadowText(root, "0/100")).not.toBeInTheDocument();
    });

    innerInput.value = "";
    innerInput.blur();
  }),
};
