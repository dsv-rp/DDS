describe("TextInput", () => {
  const getPageURL = (disabled, error) =>
    `http://localhost:6006/iframe.html?viewMode=story&id=components-text-input--default&args=disabled:${disabled};error:${error}`;
  // vision test
  describe.each(["enabled", "disabled"])("%s", (state) => {
    describe.each(["normal", "error"])("%s", (error) => {
      const baseURL = getPageURL(
        state === "disabled" ? "!true" : "!false",
        error === "error" ? "!true" : "!false"
      );
      it("base", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-text-input", {
          visible: true,
        });

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });

      it("hover", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-text-input", {
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
        const element = await page.waitForSelector("daikin-text-input", {
          visible: true,
        });

        // hover cursor on the element and hold down mouse input on the element
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
        const element = await page.waitForSelector("daikin-text-input", {
          visible: true,
        });

        await page.evaluate((container) => {
          container.focus();
        }, element);

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });
    });
  });

  // interaction test
  describe("interaction test", () => {
    it("inner input element should be enabled if not disabled", async () => {
      const baseURL = getPageURL("!false", "!false");
      await page.goto(baseURL);

      // wait for element to be visible
      await page.waitForSelector("daikin-text-input", { visible: true });

      // check input element is active
      const isDisabled = await page.$eval("daikin-text-input", (input) =>
        input.hasAttribute("disabled")
      );
      expect(isDisabled).toBe(false);
    });

    it("inner input element should be disabled if disabled", async () => {
      const baseURL = getPageURL("!true", "!false");
      await page.goto(baseURL);

      // wait for element to be visible
      await page.waitForSelector("daikin-text-input", { visible: true });

      // check input element is active
      const isDisabled = await page.$eval("daikin-text-input", (input) =>
        input.hasAttribute("disabled")
      );
      expect(isDisabled).toBe(true);
    });
  });
});
