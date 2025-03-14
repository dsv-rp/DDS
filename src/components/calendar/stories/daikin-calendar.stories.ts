import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getAllByShadowRole,
  getByShadowRole,
  getByShadowText,
  queryByShadowRole,
} from "shadow-dom-testing-library";
import { DAIKIN_CALENDER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Calendar",
  tags: ["autodocs"],
  argTypes: DAIKIN_CALENDER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    view: "date",
    onSelect: fn(),
  },
};

export const HasValue: Story = {
  args: {
    ...Default.args,
    value: "2020-01-10",
    min: "2019-12-13",
    max: "2020-02-05",
    defaultValue: "2020-01-01",
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-calendar")[0];
    await expect(root).toBeInTheDocument();

    const prevButton = getByShadowRole(root, "button", {
      name: "Previous month",
    });
    const nextButton = getByShadowRole(root, "button", { name: "Next month" });

    await step(
      "Should be properly cross over to the previous month when you enter the directional keys on the date picker",
      async () => {
        getByShadowRole(root, "button", {
          name: "9",
        }).focus();
        await userEvent.keyboard("[ArrowUp]");
        await userEvent.keyboard("[ArrowUp]");
        await userEvent.keyboard("[Enter]");

        await expect(root).toHaveProperty("value", "2019-12-26");
        await expect(args.onSelect).toHaveBeenCalledTimes(1);
      }
    );

    await step(
      "Should the focus match the minimum value if you enter a direction key and the value goes below the minimum",
      async () => {
        getByShadowRole(root, "button", {
          name: "26",
        }).focus();
        await userEvent.keyboard("[ArrowUp]");
        await userEvent.keyboard("[ArrowUp]");
        await userEvent.keyboard("[ArrowLeft]");
        await userEvent.keyboard("[Enter]");
        await expect(root).toHaveProperty("value", "2019-12-13");
        await expect(args.onSelect).toHaveBeenCalledTimes(2);
      }
    );

    await step(
      "Should the previous month button not work when you are in the month that contains the minimum value",
      async () => {
        await userEvent.click(prevButton);
        await expect(
          getByShadowText(root, "December 2019")
        ).toBeInTheDocument();
      }
    );

    await step(
      "Should be properly cross over to the next month when you enter the directional keys on the date picker",
      async () => {
        getByShadowRole(root, "button", {
          name: "29",
        }).focus();
        await userEvent.keyboard("[ArrowDown]");
        await userEvent.keyboard("[Enter]");
        await expect(root).toHaveProperty("value", "2020-01-05");
        await expect(args.onSelect).toHaveBeenCalledTimes(3);
      }
    );

    await step(
      "Should the focus match the maximum value if you enter a direction key and the value goes below the minimum",
      async () => {
        getByShadowRole(root, "button", {
          name: "26",
        }).focus();
        await userEvent.keyboard("[ArrowDown]");
        await userEvent.keyboard("[ArrowDown]");
        await userEvent.keyboard("[ArrowRight]");
        await userEvent.keyboard("[Enter]");
        await expect(root).toHaveProperty("value", "2020-02-05");
        await expect(args.onSelect).toHaveBeenCalledTimes(4);
      }
    );

    await step(
      "Should the next month button not work when you are in the month that contains the minimum value",
      async () => {
        await userEvent.click(nextButton);
        await expect(
          getByShadowText(root, "February 2020")
        ).toBeInTheDocument();
      }
    );

    await step(
      "Should the next and prev month buttons work properly",
      async () => {
        await userEvent.click(prevButton);
        await userEvent.click(prevButton);
        await expect(
          getByShadowText(root, "December 2019")
        ).toBeInTheDocument();
        await userEvent.click(nextButton);
        await expect(getByShadowText(root, "January 2020")).toBeInTheDocument();
      }
    );

    await userEvent.click(
      getByShadowRole(root, "button", {
        name: "10",
      })
    );

    await userEvent.click(
      getByShadowRole(root, "button", { name: "Switch to year view" })
    );

    await expect(
      queryByShadowRole(root, "radio", { name: "2018" })
    ).not.toBeInTheDocument();
    await expect(
      getByShadowRole(root, "radio", { name: "2019" })
    ).toBeInTheDocument();
    await expect(
      getByShadowRole(root, "radio", { name: "2020" })
    ).toBeInTheDocument();
    await expect(
      queryByShadowRole(root, "radio", { name: "2021" })
    ).not.toBeInTheDocument();

    await userEvent.click(
      getByShadowRole(root, "button", { name: "Switch to month view" })
    );

    await expect(
      getByShadowRole(root, "radio", { name: "Jan" })
    ).not.toHaveAttribute("disabled");
    await expect(
      getByShadowRole(root, "radio", { name: "Feb" })
    ).not.toHaveAttribute("disabled");
    await expect(
      getByShadowRole(root, "radio", { name: "Mar" })
    ).toHaveAttribute("disabled");

    await userEvent.click(getByShadowRole(root, "radio", { name: "Feb" }));
    await expect(getByShadowText(root, "February 2020")).toBeInTheDocument();
    await expect(
      getAllByShadowRole(root, "button", { name: "28" })
    ).toHaveLength(2);

    await userEvent.click(
      getByShadowRole(root, "button", { name: "Switch to year view" })
    );
    await userEvent.click(getByShadowRole(root, "radio", { name: "2019" }));

    await expect(
      getByShadowRole(root, "radio", { name: "Nov" })
    ).toHaveAttribute("disabled");
    await expect(
      getByShadowRole(root, "radio", { name: "Dec" })
    ).not.toHaveAttribute("disabled");
    await userEvent.click(getByShadowRole(root, "radio", { name: "Dec" }));
    await expect(getByShadowText(root, "December 2019")).toBeInTheDocument();
    await expect(
      getAllByShadowRole(root, "button", { name: "4" })
    ).toHaveLength(2);

    await userEvent.click(nextButton);
  }),
};
