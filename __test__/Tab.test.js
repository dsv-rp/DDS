const getPageURL = (size, active = false) =>
  `http://localhost:6006/iframe.html?viewMode=story&id=components-tab--tab&args=size:${size};active:!${active}`;

describe("VRT", () => {
  describe.each(["default", "condensed"])("%s", (size) => {
    describe.each(["inactive", "active"])("%s", (active) => {
      const baseURL = getPageURL(size, active === "active");

      it("base", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab", {
          visible: true,
        });

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });

      it("hover", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab", {
          visible: true,
        });

        // hover cursor on the element
        await element.hover();

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });

      it("press", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab", {
          visible: true,
        });

        // hover cursor on the element and hold down mouse button on the element
        await element.hover();
        await page.mouse.down();

        // take screenshot and check for diffs
        const image = await element.screenshot();
        await page.mouse.up();
        expect(image).toMatchImageSnapshot();
      });

      it("focus", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab", {
          visible: true,
        });

        // focus on the element
        // daikin-tab itself cannot have a focus as it is not a button element
        // we have to focus on the internal button element
        await page.evaluate((container) => {
          const button = container.shadowRoot.querySelector("button");
          button.focus();
        }, element);

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });

      it("disabled", async () => {
        // load page with disabled=true
        await page.goto(`${baseURL};disabled:!true`);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab", {
          visible: true,
        });

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });
    });
  });
});

describe("Interaction Test", () => {
  const baseURL = getPageURL("default");

  it("tab is clickable when not disabled", async () => {
    await page.goto(baseURL);

    // wait for element to be visible
    const tab = await page.waitForSelector("daikin-tab", { visible: true });

    // check if the internal button element is not disabled
    const isDisabled = await page.evaluate(
      (tab) => tab.shadowRoot.querySelector("button").disabled,
      tab
    );

    expect(isDisabled).toBe(false);
  });

  it("tab is not clickable when disabled", async () => {
    await page.goto(`${baseURL};disabled:!true`);

    // wait for element to be visible
    const tab = await page.waitForSelector("daikin-tab", { visible: true });

    // check if the internal button element is disabled
    const isDisabled = await page.evaluate(
      (tab) => tab.shadowRoot.querySelector("button").disabled,
      tab
    );

    expect(isDisabled).toBe(true);
  });
});
