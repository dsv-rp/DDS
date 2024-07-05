describe("InputGroup", () => {
  const getPageURL = (input, disabled, required, error) =>
    `http://localhost:6006/iframe.html?viewMode=story&id=components-input-group--default&args=input:${input};disabled:${disabled};required:${required};error:${error}`;
  // vision test
  describe.each(["Text%20Input", "Textarea"])("%s", (input) => {
    describe.each(["disabled", "enabled"])("%s", (state) => {
      describe.each(["required", "optional"])("%s", (required) => {
        it.each(["error", "normal"])("%s", async (error) => {
          const baseURL = getPageURL(
            input,
            state === "disabled" ? "!true" : "!false",
            required === "required" ? "!true" : "!false",
            error === "error" ? "Error text" : ""
          );
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-input-group", {
            visible: true,
          });

          // take screenshot and check for diffs
          const image = await element.screenshot();
          expect(image).toMatchImageSnapshot();
        });
      });
    });
  });

  describe("interaction test", () => {
    it("The number on the counter changes according to the number of characters in the text area", async () => {
      const baseURL = getPageURL("Textarea", "!false", "!false", "");
      await page.goto(baseURL);

      // wait for element to be visible
      await page.waitForSelector("daikin-input-group", {
        visible: true,
      });
      expect(await page.locator("::-p-text(0/100)")).toBeTruthy();

      await page.type("::-p-aria([role='textbox'])", "value");
      expect(await page.locator("::-p-text(value)")).toBeTruthy();
      expect(await page.locator("::-p-text(5/100)")).toBeTruthy();
      expect(await page.$("::-p-text(0/100)")).toBeFalsy();
    });
  });
});
