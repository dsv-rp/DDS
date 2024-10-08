import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect } from "@storybook/test";
import { DAIKIN_TOOLTIP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOOLTIP_ARG_TYPES,
  ...metadata,
};

export const Light: Story = {
  args: {
    placement: "bottom",
    variant: "light",
    open: false,
    description: "Test description.\nNewlines supported.",
    closeOnClick: false,
    trigger: "hover",
    tooltipSlot:
      "Lorem ipsum dolor sit abet, consectetur advising edit. Maris fuegian, risus quia ferment protector, tupis ligula Laurent libero, id elemental cetus massa eu ipsum.",
  },
};

export const Dark: Story = {
  args: {
    ...Light.args,
    variant: "dark",
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tooltip")[0];
    await expect(root).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const triggerElement = root.shadowRoot!.querySelector("div")!;
    await expect(triggerElement).toBeInTheDocument();
    const tooltip = root.shadowRoot?.querySelector("span");
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).not.toBeVisible();

    // TODO(DDS-1269): hover function is not work well when using storybook test library
    // await userEvent.hover(triggerElement);

    // await expect(tooltip).toBeVisible();
    // await userEvent.click(triggerElement);
    // await expect(tooltip).not.toBeVisible();
  }),
};
