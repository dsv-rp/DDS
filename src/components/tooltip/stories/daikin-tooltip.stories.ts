// This will import either "./framework-wc" or "./framework-react". See `vite.config.storybook.ts`.
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent } from "@storybook/test";
import { DAIKIN_TOOLTIP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOOLTIP_ARG_TYPES,
  ...metadata,
};

export const Light: Story = {
  args: {
    placement: "top",
    variant: "light",
    open: false,
    description: "test description",
    closeOnClick: false,
  },
};

export const Dark: Story = {
  args: {
    placement: "top",
    variant: "dark",
    open: false,
    description: "test description",
    closeOnClick: true,
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

    // TODO: hover function is not work well when using storybook test library
    await userEvent.hover(triggerElement);

    await expect(tooltip).toBeVisible();
    await userEvent.click(triggerElement);
    await expect(tooltip).not.toBeVisible();
  }),
};
