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
    label: "Label text",
    helper: "Helper text",
    disabled: false,
    content: "TextField",
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
    required: "Required",
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

export const Dropdown: Story = {
  args: {
    ...Default.args,
    content: "Dropdown",
  },
};

export const RadioGroup: Story = {
  args: {
    ...Default.args,
    content: "RadioGroup",
  },
};

export const Select: Story = {
  args: {
    ...Default.args,
    content: "Select",
  },
};

export const TextArea: Story = {
  args: {
    ...Default.args,
    textareaMaxCount: 100,
    textareaLimitExceedError: "The number of characters exceeds the limit",
    content: "TextArea",
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-input-group")[0];
    await expect(root).toBeInTheDocument();

    const innerInput: HTMLInputElement = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("Value");
    await expect(getByShadowText(root, "5/100")).toBeInTheDocument();

    // has counter
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "A");
      await expect(getByShadowText(root, "6/100")).toBeInTheDocument();
      await expect(queryByShadowText(root, "5/100")).not.toBeInTheDocument();
    });

    await userEvent.keyboard("[BackSpace]");
    await expect(queryByShadowText(root, "5/100")).toBeInTheDocument();
    innerInput.blur();
  }),
};
