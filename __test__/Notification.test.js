describe("Notification", () => {
  const getPageURL = (variant, status, line, closeButton) =>
    `http://localhost:6006/iframe.html?viewMode=story&id=components-notification--${variant}&args=status:${status};line:${line};open:!true;closeButton:${closeButton}`;
  // vision test
  describe.each(["toast", "inline"])("%s", (variant) => {
    describe.each(["positive", "negative", "warning", "alarm", "information"])(
      "%s",
      (status) => {
        describe.each(["single", "multi"])("%s", (line) => {
          it.each(["!true", "!false"])("%s", async (closeButton) => {
            const baseURL = getPageURL(variant, status, line, closeButton);
            await page.goto(baseURL);

            // wait for element to be visible
            const element = await page.waitForSelector("daikin-notification", {
              visible: true,
            });

            // take screenshot and check for diffs
            const image = await element.screenshot();
            expect(image).toMatchImageSnapshot();
          });
        });
      }
    );
  });

  // interaction test
  describe("interaction test", () => {
    it("Can not find the close button by default", async () => {
      await page.goto(getPageURL("toast", "positive", "single", "!false"), {
        waitUntil: "domcontentloaded",
      });

      // wait for element to be visible
      await page.waitForSelector("daikin-notification", {
        visible: true,
      });

      expect(await page.locator("::-p-text(Notification-title)")).toBeTruthy();

      expect(
        await page.$('::-p-aria([name="Close"][role="button"])')
      ).toBeFalsy();
    });
    it("When `closeButton` is true, the close button is found and the Notification disappears when clicked", async () => {
      await page.goto(getPageURL("toast", "positive", "single", "!true"), {
        waitUntil: "domcontentloaded",
      });

      // wait for element to be visible
      await page.waitForSelector("daikin-notification", {
        visible: true,
      });

      expect(await page.locator("::-p-text(Notification-title)")).toBeTruthy();

      const closeButton = await page.waitForSelector(
        '::-p-aria([name="Close"][role="button"])'
      );
      await closeButton.click();

      expect(await page.$("::-p-text(Notification-title)")).toBeFalsy();
    });
  });
});
