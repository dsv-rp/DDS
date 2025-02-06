import type { DaikinRadio } from "#package/components/radio/daikin-radio";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getAllByShadowText,
  getByShadowRole,
} from "shadow-dom-testing-library";
import { DAIKIN_RADIO_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Radio",
  tags: ["autodocs"],
  argTypes: DAIKIN_RADIO_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    checked: (event.target as DaikinRadio).checked,
  };
}

export const Default: Story = {
  args: {
    label: "Radio label",
    labelPosition: "right",
    checked: false,
    disabled: false,
    onChange: fn(eventPayloadTransformer),
    onClick: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-radio")[0];
    await expect(root).toBeInTheDocument();

    const innerRadio = getByShadowRole(root, "radio", {
      name: "Radio label",
    });
    await expect(innerRadio).toBeInTheDocument();

    const label = getAllByShadowText(root, "Radio label")[1];
    await expect(label).toBeInTheDocument();

    await expect(innerRadio).not.toBeChecked();

    // should react if inner radio clicked
    await step("Try to click inner radio", async () => {
      await userEvent.click(innerRadio);
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveLastReturnedWith({ checked: true });
      await expect(args.onClick).toHaveBeenCalledOnce();
      await expect(innerRadio).toBeChecked();
      root.checked = false;
    });

    // should also react if label clicked
    await step("Try to click label", async () => {
      await userEvent.click(label);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveLastReturnedWith({ checked: true });
      await expect(args.onClick).toHaveBeenCalledTimes(2);
      await expect(innerRadio).toBeChecked();
      root.checked = false;
    });
  }),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onChange: fn(),
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-radio")[0];
    await expect(root).toBeInTheDocument();

    const innerRadio = getByShadowRole(root, "radio", {
      name: "Radio label",
    });
    await expect(innerRadio).toBeInTheDocument();

    const label = getAllByShadowText(root, "Radio label")[1];
    await expect(label).toBeInTheDocument();

    await expect(innerRadio).not.toBeChecked();

    // should not react if inner radio clicked
    await step("Try to click inner radio", async () => {
      await userEvent.click(innerRadio);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(innerRadio).not.toBeChecked();
    });

    // also should not react if label clicked
    await step("Try to click label", async () => {
      await userEvent.click(label);
      await expect(args.onChange).not.toHaveBeenCalled();
      await expect(innerRadio).not.toBeChecked();
    });
  }),
};
