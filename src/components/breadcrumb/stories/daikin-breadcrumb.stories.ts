import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect } from "@storybook/test";
import { DAIKIN_BREADCRUMB_ARG_TYPES, type BreadcrumbStory } from "./common";

export default {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  argTypes: DAIKIN_BREADCRUMB_ARG_TYPES,
  ...metadata,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Default: BreadcrumbStory = {
  args: {
    noTrailingSlash: false,
    omission: false,
  },
};

export const Omission: BreadcrumbStory = {
  args: {
    noTrailingSlash: true,
    omission: true,
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-breadcrumb")[0];
    await expect(root).toBeInTheDocument();

    const daikinBreadCrumbItems = root.shadowRoot
      .querySelector("slot")
      .assignedElements({ flatten: true });

    daikinBreadCrumbItems.forEach((item, index) => {
      if (index === 0) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      } else if (index === 1) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      } else if (index === 2) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      } else if (index === 3) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      } else if (index === 4) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      }
    });

    const div = root.shadowRoot.querySelector("div");
    const divLength = div.offsetWidth;
    const changeLength = divLength - 100;
    root.style.width = `${changeLength}px`;
    await sleep(500);

    daikinBreadCrumbItems.forEach((item, index) => {
      if (index === 0) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      } else if (index === 1) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "min");
      } else if (index === 2) {
        expect(item).toHaveAttribute("hidden");
      } else if (index === 3) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      } else if (index === 4) {
        expect(item).not.toHaveAttribute("hidden");
        expect(item).toHaveAttribute("size", "max");
      }
    });
  }),
};
