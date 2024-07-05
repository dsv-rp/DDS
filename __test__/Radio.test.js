const isChecked = (elementHandle) =>
  page.evaluate((element) => {
    const innerCheckbox = element.shadowRoot.querySelector("input");
    return innerCheckbox.checked;
  }, elementHandle);

describe("Radio", () => {
  const getPageURL = (size, label, labelPosition, checked, stateStr) =>
    `http://localhost:6006/iframe.html?viewMode=story&id=components-radio--small&args=size:${size};label:${label};labelPosition:${labelPosition};checked:!${checked};${stateStr}`;
  // vision test
  describe.each(["small", "large"])("%s", (size) => {
    describe.each(["left", "right"])("%s", (labelPosition) => {
      describe.each(["checked", "unchecked"])("%s", (checked) => {
        describe.each(["enabled", "disabled", "readonly"])("%s", (state) => {
          let stateStr = "";
          if (state === "disabled") {
            stateStr = "disabled:!true";
          } else if (state === "readonly") {
            stateStr = "readonly:!true";
          }
          const baseURL = getPageURL(
            size,
            "test label",
            labelPosition,
            checked === "checked",
            stateStr
          );

          it("base", async () => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-radio", {
              visible: true,
            });

            // take screenshot and check for diffs
            const image = await element.screenshot();
            expect(image).toMatchImageSnapshot();
          });

          it("hover", async () => {
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-radio", {
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
            const element = await page.waitForSelector("daikin-radio", {
              visible: true,
            });

            // hover cursor on the element and hold down mouse radio on the element
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
            const element = await page.waitForSelector("daikin-radio", {
              visible: true,
            });

            await page.evaluate((container) => {
              const radio = container.shadowRoot.querySelector("input");
              radio.focus();
            }, element);

            // take screenshot and check for diffs
            const image = await element.screenshot();
            expect(image).toMatchImageSnapshot();
          });
        });
      });
    });
  });

  // interaction test
  describe("interaction test", () => {
    const baseURL = getPageURL("small", "test label", "right", "unchecked");
    it("click the radio and will be checked when default", async () => {
      await page.goto(baseURL);

      // wait for element to be visible
      const daikinRadio = await page.waitForSelector("daikin-radio", {
        visible: true,
      });

      // check daikin-radio not be checked
      const isCheckedBefore = await isChecked(daikinRadio);
      expect(isCheckedBefore).toBe(false);

      // click daikin-radio
      await page.locator("daikin-radio").click();

      // check daikin-radio be checked
      const isCheckedAfter = await isChecked(daikinRadio);
      expect(isCheckedAfter).toBe(true);
    });

    it("click the radio and will not be checked when disabled", async () => {
      await page.goto(`${baseURL};disabled:true`);

      // wait for element to be visible
      const daikinRadio = await page.waitForSelector("daikin-radio", {
        visible: true,
      });

      // check daikin-radio not be checked
      const isCheckedBefore = await isChecked(daikinRadio);
      expect(isCheckedBefore).toBe(false);

      // click daikin-radio
      await page.locator("daikin-radio").click();

      // check daikin-radio be checked
      const isCheckedAfter = await isChecked(daikinRadio);
      expect(isCheckedAfter).toBe(false);
    });

    it("click the radio and will not be checked when readonly", async () => {
      await page.goto(`${baseURL};readonly:true`);

      // wait for element to be visible
      const daikinRadio = await page.waitForSelector("daikin-radio", {
        visible: true,
      });

      // check daikin-radio not be checked
      const isCheckedBefore = await isChecked(daikinRadio);
      expect(isCheckedBefore).toBe(false);

      // click daikin-radio
      await page.locator("daikin-radio").click();

      // check daikin-radio be checked
      const isCheckedAfter = await isChecked(daikinRadio);
      expect(isCheckedAfter).toBe(false);
    });
  });
});
