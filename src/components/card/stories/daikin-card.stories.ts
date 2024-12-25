import { metadata } from "#storybook-framework";
import { DAIKIN_CARD_ARG_TYPES, type CardStory } from "./common";

export default {
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: DAIKIN_CARD_ARG_TYPES,
  ...metadata,
};

export const Default: CardStory = {
  args: {
    outline: true,
    withBody: true,
    withFooter: true,
  },
};
