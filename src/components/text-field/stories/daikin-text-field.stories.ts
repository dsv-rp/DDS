import type { DaikinTextField } from "#package/components/text-field/daikin-text-field";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getByShadowPlaceholderText,
  getByShadowRole,
} from "shadow-dom-testing-library";
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

export const Text: Story = {
  args: {
    value: "",
    type: "text",
    placeholder: "Text input",
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

    await expect(innerInput).toHaveValue("");

    // should react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(args.onInput).toHaveBeenCalled();
      await expect(args.onInput).toHaveLastReturnedWith({
        value: "Example",
      });
      await expect(innerInput).toHaveValue("Example");
    });

    root.value = "";
    innerInput.blur();
  }),
};

export const Error: Story = {
  args: {
    ...Text.args,
    error: true,
    onChange: fn(),
    onInput: fn(),
  },
};

export const WithIcon: Story = {
  args: {
    ...Text.args,
    leftIcon: "positive",
    rightIcon: "positive",
    onChange: fn(),
    onInput: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Text.args,
    disabled: true,
    onChange: fn(),
    onInput: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-text-field")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "textbox");
    await expect(innerInput).toBeInTheDocument();

    // should not react if inner input typed
    await step("Try to type inner textbox", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(args.onChange).not.toHaveBeenCalled();
    });

    innerInput.blur();
  }),
};

export const Readonly: Story = {
  args: {
    ...Text.args,
    readonly: true,
    onChange: fn(),
    onInput: fn(),
  },
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Disabled has play function
  play: Disabled.play!,
};

export const Search: Story = {
  args: {
    ...Text.args,
    type: "search",
    placeholder: "Search input",
    onSearch: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-text-field")[0];
    await expect(root).toBeInTheDocument();

    const input = getByShadowPlaceholderText(root, "Search input");
    input.focus();
    await userEvent.keyboard("search");
    await expect(root.value).toBe("search");

    await step("Try to type enter key", async () => {
      await userEvent.keyboard("[Enter]");
      await expect(args.onSearch).toHaveBeenCalledTimes(1);
    });

    await step("Try to click clear button", async () => {
      await userEvent.click(getByShadowRole(root, "button", { name: "Clear" }));
      await expect(args.onSearch).toHaveBeenCalledTimes(1);
      await expect(root.value).toBe("");
    });
  }),
};
