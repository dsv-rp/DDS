import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_CAROUSEL_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Carousel",
  tags: ["autodocs"],
  argTypes: DAIKIN_CAROUSEL_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    duration: 600,
    currentIndex: 0,
    controlButtonVariant: "ghost",
    allowSwipe: false,
    onSelect: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-carousel")[0];
    await expect(root).toBeInTheDocument();

    await step(
      "Should be displayed next contents if you press the next button",
      async () => {
        await userEvent.click(
          getByShadowRole(root, "button", {
            name: "Next",
          })
        );
        await expect(root.getAttribute("current-index")).toBe("1");
        await expect(args.onSelect).toBeCalledTimes(1);
      }
    );

    await step(
      "Should be displayed fifth contents if you press the fifth indicator. Also, should be disabled next button if you showed the last content",
      async () => {
        await userEvent.click(
          getByShadowRole(root, "tab", {
            name: "Slide 5",
          })
        );
        await expect(root.getAttribute("current-index")).toBe("4");
        await expect(args.onSelect).toBeCalledTimes(2);

        await expect(
          getByShadowRole(root, "button", {
            name: "Next",
          })
        ).toHaveAttribute("disabled");
      }
    );

    await step(
      "Should be displayed prev contents if you press the prev button",
      async () => {
        await userEvent.click(
          getByShadowRole(root, "button", {
            name: "Previous",
          })
        );
        await expect(root.getAttribute("current-index")).toBe("3");
        await expect(args.onSelect).toBeCalledTimes(3);
      }
    );

    await step(
      "Should be disabled prev button if you showed the first content",
      async () => {
        await userEvent.click(
          getByShadowRole(root, "tab", {
            name: "Slide 1",
          })
        );
        await expect(
          getByShadowRole(root, "button", {
            name: "Previous",
          })
        ).toHaveAttribute("disabled");
      }
    );
  }),
};
