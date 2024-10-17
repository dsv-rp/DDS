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
    trailingSlash: false,
    overflow: "visible",
  },
};

export const Omission: BreadcrumbStory = {
  args: {
    trailingSlash: true,
    overflow: "ellipsis",
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-breadcrumb")[0];
    await expect(root).toBeInTheDocument();

    const daikinBreadCrumbItems =
      root.shadowRoot
        ?.querySelector("slot")
        ?.assignedElements({ flatten: true }) ?? [];
    await expect(daikinBreadCrumbItems[0]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[0]).toHaveAttribute("variant", "normal");
    await expect(daikinBreadCrumbItems[1]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[1]).toHaveAttribute("variant", "normal");
    await expect(daikinBreadCrumbItems[2]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[2]).toHaveAttribute("variant", "normal");
    await expect(daikinBreadCrumbItems[3]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[3]).toHaveAttribute("variant", "normal");
    await expect(daikinBreadCrumbItems[4]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[4]).toHaveAttribute("variant", "normal");

    const div = root.shadowRoot?.querySelector("div");
    const divLength = div?.offsetWidth ?? 0;
    const changeLength = divLength - 100;
    root.style.width = `${changeLength}px`;
    await sleep(500);

    await expect(daikinBreadCrumbItems[0]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[0]).toHaveAttribute("variant", "normal");
    await expect(daikinBreadCrumbItems[1]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[1]).toHaveAttribute(
      "variant",
      "ellipsis"
    );
    await expect(daikinBreadCrumbItems[2]).toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[3]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[3]).toHaveAttribute("variant", "normal");
    await expect(daikinBreadCrumbItems[4]).not.toHaveAttribute("hidden");
    await expect(daikinBreadCrumbItems[4]).toHaveAttribute("variant", "normal");

    root.style.width = `${divLength + 1}px`;
    await sleep(500);
    root.style.removeProperty("width");
  }),
};
