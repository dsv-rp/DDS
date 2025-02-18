import type { DaikinTextField } from "#package/components/text-field/daikin-text-field";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TEXT_FIELD_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Text Field",
  tags: ["autodocs"],
  argTypes: DAIKIN_TEXT_FIELD_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinTextField).value,
  };
}

export const Default: Story = {
  args: {
    value: "Value",
    type: "text",
    placeholder: "Placeholder text",
    name: "Example",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    onChange: fn(eventPayloadTransformer),
    onInput: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-text-field")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("Value");

    // should react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(args.onInput).toHaveBeenCalled();
      await expect(args.onInput).toHaveLastReturnedWith({
        value: "ValueExample",
      });
      await expect(innerInput).toHaveValue("ValueExample");
    });

    root.value = "Value";
    innerInput.blur();
  }),
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    onChange: fn(),
    onInput: fn(),
  },
};

export const LeftIcon: Story = {
  args: {
    ...Default.args,
    leftIcon: "positive",
    onChange: fn(),
    onInput: fn(),
  },
};

export const RightIcon: Story = {
  args: {
    ...Default.args,
    rightIcon: "positive",
    onChange: fn(),
    onInput: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onChange: fn(),
    onInput: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-text-field")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("Value");

    // should not react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(innerInput).toHaveValue("Value");
      await expect(args.onChange).not.toHaveBeenCalled();
    });

    innerInput.blur();
  }),
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    readonly: true,
    onChange: fn(),
    onInput: fn(),
  },
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Disabled has play function
  play: Disabled.play!,
};
