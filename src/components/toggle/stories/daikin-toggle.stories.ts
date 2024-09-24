import type { DaikinToggle } from "#package/components/toggle/daikin-toggle";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TOGGLE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Toggle",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOGGLE_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    checked: (event.target as DaikinToggle).checked,
  };
}

export const Default: Story = {
  args: {
    size: "default",
    disabled: false,
    checked: false,
    onChange: fn(eventPayloadTransformer),
    onClick: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-toggle")[0];
    await expect(root).toBeInTheDocument();

    const toggle = getByShadowRole(root, "checkbox");
    await expect(toggle).toBeInTheDocument();

    await expect(toggle).not.toBeChecked();

    // should react if inner toggle clicked
    await step("Try to click toggle first time", async () => {
      await userEvent.click(toggle);
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(args.onClick).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveLastReturnedWith({ checked: true });
      await expect(args.onClick).toHaveLastReturnedWith({ checked: false }); // "click" event is sent before "change" event.
      await expect(toggle).toBeChecked();
    });

    await step("Try to click toggle second time", async () => {
      await userEvent.click(toggle);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onClick).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveLastReturnedWith({ checked: false });
      await expect(args.onClick).toHaveLastReturnedWith({ checked: true }); // "click" event is sent before "change" event.
      await expect(toggle).not.toBeChecked();
    });

    // clear the focus event
    toggle.blur();
  }),
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
    onChange: fn(),
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    size: "default",
    onChange: fn(),
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-toggle")[0];
    await expect(root).toBeInTheDocument();

    const toggle = getByShadowRole(root, "checkbox");
    await expect(toggle).toBeInTheDocument();

    await expect(toggle).not.toBeChecked();

    // should react if inner toggle clicked
    await step("Try to click toggle first time", async () => {
      await userEvent.click(toggle);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(args.onClick).not.toHaveBeenCalled();
      await expect(toggle).not.toBeChecked();
    });
  }),
};
