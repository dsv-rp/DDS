import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import type { DaikinRadioGroup } from "../daikin-radio-group";
import { DAIKIN_RADIO_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Radio Group",
  tags: ["autodocs"],
  argTypes: DAIKIN_RADIO_GROUP_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinRadioGroup).value,
  };
}

export const Default: Story = {
  args: {
    orientation: "horizontal",
    name: "name",
    value: "value1",
    onChange: fn(eventPayloadTransformer),
    onClick: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-radio-group")[0];
    await expect(root).toBeInTheDocument();
    await expect(root.value).toEqual("value1");
    const firstRadio = getByShadowRole(root, "radio", { name: "Option1" });
    const secondRadio = getByShadowRole(root, "radio", { name: "Option2" });
    const thirdRadio = getByShadowRole(root, "radio", { name: "Option3" });

    // The radio be clicked should be checked and the others should be unchecked
    await step("Try to click second radio", async () => {
      await userEvent.click(secondRadio);
      await expect(args.onChange).toHaveBeenCalledOnce();
      await expect(args.onChange).toHaveLastReturnedWith({ value: "value2" });
      await expect(secondRadio).toBeChecked();
      await expect(root.value).toEqual("value2");
      await expect(firstRadio).not.toBeChecked();
      await expect(thirdRadio).not.toBeChecked();
    });

    await step("Try to click third radio", async () => {
      await userEvent.click(thirdRadio);
      await expect(args.onChange).toBeCalledTimes(2);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "value3" });
      await expect(thirdRadio).toBeChecked();
      await expect(root.value).toEqual("value3");
      await expect(firstRadio).not.toBeChecked();
      await expect(secondRadio).not.toBeChecked();
    });

    // Click the same radio and onchange event will not fired
    await step("Try to click third radio again", async () => {
      await userEvent.click(thirdRadio);
      await expect(args.onChange).toBeCalledTimes(2);
      await expect(thirdRadio).toBeChecked();
      await expect(root.value).toEqual("value3");
      await expect(firstRadio).not.toBeChecked();
      await expect(secondRadio).not.toBeChecked();
    });

    await userEvent.click(firstRadio);
  }),
};
