import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_BREADCRUMB_ARG_TYPES, type BreadcrumbStory } from "./common";

export default {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  argTypes: DAIKIN_BREADCRUMB_ARG_TYPES,
  ...metadata,
};

export const Omission: BreadcrumbStory = {
  args: {
    noTrailingSlash: true,
    omission: true,
  },
};
