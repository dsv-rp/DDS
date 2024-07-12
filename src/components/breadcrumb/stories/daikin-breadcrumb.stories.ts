import { metadata } from "#storybook-framework";
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
