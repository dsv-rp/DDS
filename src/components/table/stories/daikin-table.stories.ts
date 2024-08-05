import { metadata } from "#storybook-framework";
import { DAIKIN_TABLE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Table",
  tags: ["autodocs"],
  argTypes: DAIKIN_TABLE_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    headers: [
      { key: "name", label: "Name", align: "left" },
      { key: "season", label: "Season", align: "left" },
      { key: "price", label: "Price", align: "right" },
    ],
    rows: [
      { id: "1", name: "Apple", season: "Autumn", price: "$2" },
      { id: "2", name: "Peach", season: "Summer", price: "$4" },
      { id: "3", name: "Orange", season: "Winter", price: "$1" },
      { id: "4", name: "Strawberry", season: "Spring", price: "$4" },
    ],
  },
};
