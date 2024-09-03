import type { DaikinTextarea } from "#package/components/textarea/daikin-textarea";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TEXTAREA_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Textarea",
  tags: ["autodocs"],
  argTypes: DAIKIN_TEXTAREA_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinTextarea).value,
  };
}

function eventPayloadTransformerForOnChangeInput(
  event: Event & { detail: { valueCount: number } }
) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: event.detail.valueCount,
  };
}

export const Default: Story = {
  args: {
    placeholder: "Placeholder text",
    disabled: false,
    readonly: false,
    error: false,
    resizable: true,
    __vrtArgs__: "",
    onChange: fn(eventPayloadTransformer),
    onInput: fn(eventPayloadTransformer),
    onChangeCount: fn(eventPayloadTransformerForOnChangeInput),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-textarea")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("");

    // should react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(args.onInput).toHaveBeenCalled();
      await expect(args.onInput).toHaveLastReturnedWith({
        value: "Example",
      });
      await expect(args.onChangeCount).toHaveLastReturnedWith({ value: 7 });
      await expect(innerInput).toHaveValue("Example");
    });

    root.value = "";
    innerInput.blur();
  }),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onChange: fn(),
    onInput: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-textarea")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    await expect(innerInput).toHaveValue("");

    // should not react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(innerInput).toHaveValue("");
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

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    onChange: fn(),
    onInput: fn(),
  },
};
