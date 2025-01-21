import type { DaikinSlider } from "#package/components/slider/daikin-slider";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fireEvent, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_SLIDER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Slider",
  tags: ["autodocs"],
  argTypes: DAIKIN_SLIDER_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinSlider).value,
  };
}

export const Default: Story = {
  args: {
    name: "Slider label",
    value: "1",
    min: "1",
    max: "10",
    step: "1",
    onChange: fn(eventPayloadTransformer),
    onInput: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-slider")[0];
    await expect(root).toBeInTheDocument();

    const thumb = getByShadowRole(root, "slider");
    await expect(thumb).toBeInTheDocument();

    const slider = root.shadowRoot?.getElementById("slider") as HTMLElement;
    await expect(slider).toBeInTheDocument();

    // Test drag slider thumb with mouse
    await step("Drag the slider thumb to value 3", async () => {
      await fireEvent.mouseDown(thumb);
      await fireEvent.mouseMove(thumb, { clientX: (root.clientWidth * 2) / 9 });
      await fireEvent.mouseUp(thumb);
      await expect(root.value).toEqual("3");
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "3" });
      await expect(args.onInput).toHaveBeenCalledTimes(2);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "3" });
    });

    await step("Drag the slider thumb to most right", async () => {
      await fireEvent.mouseDown(thumb);
      await fireEvent.mouseMove(thumb, { clientX: root.clientWidth });
      await fireEvent.mouseUp(thumb);
      await expect(root.value).toEqual("10");
      await expect(args.onChange).toHaveBeenCalledTimes(3);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "10" });
      await expect(args.onInput).toHaveBeenCalledTimes(3);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "10" });
    });

    await step("Drag the slider thumb to most left", async () => {
      await fireEvent.mouseDown(thumb);
      await fireEvent.mouseMove(thumb, { clientX: 0 });
      await fireEvent.mouseUp(thumb);
      await expect(root.value).toEqual("1");
      await expect(args.onChange).toHaveBeenCalledTimes(4);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "1" });
      await expect(args.onInput).toHaveBeenCalledTimes(4);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "1" });
    });

    // Test move slider thumb with keyboard
    await step("Move the slider thumb to next with keyboard", async () => {
      thumb.focus();
      await userEvent.keyboard("[ArrowRight]");
      await expect(root.value).toEqual("2");
      await userEvent.keyboard("[ArrowUp]");
      await expect(root.value).toEqual("3");
      await expect(args.onChange).toHaveBeenCalledTimes(6);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "3" });
      await expect(args.onInput).toHaveBeenCalledTimes(6);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "3" });
    });

    await step("Move the slider thumb to previous with keyboard", async () => {
      thumb.focus();
      await userEvent.keyboard("[ArrowLeft]");
      await expect(root.value).toEqual("2");
      await userEvent.keyboard("[ArrowDown]");
      await expect(root.value).toEqual("1");
      await expect(args.onChange).toHaveBeenCalledTimes(8);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "1" });
      await expect(args.onInput).toHaveBeenCalledTimes(8);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "1" });
    });

    await step("Move the slider thumb to last with keyboard", async () => {
      thumb.focus();
      await userEvent.keyboard("[End]");
      await expect(root.value).toEqual("10");
      await expect(args.onChange).toHaveBeenCalledTimes(9);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "10" });
      await expect(args.onInput).toHaveBeenCalledTimes(9);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "10" });
    });

    await step("Move the slider thumb to begin with keyboard", async () => {
      thumb.focus();
      await userEvent.keyboard("[Home]");
      await expect(root.value).toEqual("1");
      await expect(args.onChange).toHaveBeenCalledTimes(10);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "1" });
      await expect(args.onInput).toHaveBeenCalledTimes(10);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "1" });
    });

    // Test click slider bar directly
    await step("Directly click the slider bar to choice value", async () => {
      const sliderRect = slider.getBoundingClientRect();
      await userEvent.pointer({
        keys: "[MouseLeft]",
        target: slider,
        coords: { x: sliderRect.width / 2, y: sliderRect.height / 2 },
      });
      await userEvent.click(root);
      await expect(root.value).toEqual("5");
      await expect(args.onChange).toHaveBeenCalledTimes(11);
      await expect(args.onChange).toHaveLastReturnedWith({ value: "5" });
      await expect(args.onInput).toHaveBeenCalledTimes(11);
      await expect(args.onInput).toHaveLastReturnedWith({ value: "5" });
    });
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
    const root = canvasElement.getElementsByTagName("daikin-slider")[0];
    await expect(root).toBeInTheDocument();

    const thumb = getByShadowRole(root, "slider");
    await expect(thumb).toBeInTheDocument();

    const slider = root.shadowRoot?.getElementById("slider") as HTMLElement;
    await expect(slider).toBeInTheDocument();

    // Test drag slider thumb with mouse
    await step("Drag the slider thumb to value 3 when disabled", async () => {
      await fireEvent.mouseDown(thumb);
      await fireEvent.mouseMove(thumb, { clientX: (root.clientWidth * 2) / 9 });
      await fireEvent.mouseUp(thumb);
      await expect(root.value).toEqual("1");
      await expect(args.onChange).not.toHaveBeenCalledOnce();
      await expect(args.onInput).not.toHaveBeenCalledOnce();
    });

    // Test move slider thumb with keyboard
    await step(
      "Move the slider thumb to next with keyboard when disabled",
      async () => {
        thumb.focus();
        await userEvent.keyboard("[ArrowRight]");
        await expect(root.value).toEqual("1");
        await userEvent.keyboard("[ArrowUp]");
        await expect(root.value).toEqual("1");
        await expect(args.onChange).not.toHaveBeenCalledOnce();
        await expect(args.onInput).not.toHaveBeenCalledOnce();
      }
    );

    // Test click slider bar directly
    await step(
      "Directly click the slider bar to choice value when disabled",
      async () => {
        const sliderRect = slider.getBoundingClientRect();
        try {
          await userEvent.pointer({
            keys: "[MouseLeft]",
            target: slider,
            coords: { x: sliderRect.width / 2, y: sliderRect.height / 2 },
          });
          await userEvent.click(root);
        } catch (e) {
          await expect(e).not.toBeNull();
        }
        await expect(root.value).toEqual("1");
        await expect(args.onChange).not.toHaveBeenCalledOnce();
        await expect(args.onInput).not.toHaveBeenCalledOnce();
      }
    );
  }),
};
