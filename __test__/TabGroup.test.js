const getPageURL = (size = "default", value = "foo", storySuffix = "") =>
  `http://localhost:6006/iframe.html?viewMode=story&id=components-tabgroup--tab-group${storySuffix}&args=size:${size};value:${value}`;

describe("VRT", () => {
  describe("normal", () => {
    describe.each(["default", "condensed"])("%s", (size) => {
      describe.each(["foo", "baz"])("%s", (value) => {
        const baseURL = getPageURL(size, value);

        it("base", async () => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-tab-group", {
            visible: true,
          });

          // take screenshot and check for diffs
          const image = await element.screenshot();
          expect(image).toMatchImageSnapshot();
        });
      });
    });
  });

  describe("single", () => {
    describe.each(["default", "condensed"])("%s", (size) => {
      const baseURL = getPageURL(size, "foo", "-single");

      it("base", async () => {
        await page.goto(baseURL);

        // wait for element to be visible
        const element = await page.waitForSelector("daikin-tab-group", {
          visible: true,
        });

        // take screenshot and check for diffs
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      });
    });
  });

  describe("many", () => {
    describe.each(["default", "condensed"])("%s", (size) => {
      describe.each(["tab1", "tab20"])("%s", (value) => {
        const baseURL = getPageURL(size, value, "-many");

        it("base", async () => {
          await page.goto(baseURL);

          // wait for element to be visible
          const element = await page.waitForSelector("daikin-tab-group", {
            visible: true,
          });

          // take screenshot and check for diffs
          const image = await element.screenshot();
          expect(image).toMatchImageSnapshot();
        });
      });
    });
  });
});

describe("Interaction Test", () => {
  const baseURL = getPageURL();

  const isActive = (elementHandle) => {
    if (!elementHandle) {
      throw new Error("Element is null");
    }
    return page.evaluate((element) => element.active, elementHandle);
  };

  it("Active tab changes when enabled tab clicked", async () => {
    await page.goto(baseURL);

    // wait for elements to be visible
    await page.waitForSelector("daikin-tab-group", {
      visible: true,
    });

    const fooTab = await page.$('daikin-tab[value="foo"]');
    const bazTab = await page.$('daikin-tab[value="baz"]');

    expect(await isActive(fooTab)).toBe(true);
    expect(await isActive(bazTab)).toBe(false);

    // click on Baz tab
    await bazTab.click();

    expect(await isActive(fooTab)).toBe(false);
    expect(await isActive(bazTab)).toBe(true);
  });

  it("Active tab do not change when disabled tab clicked", async () => {
    await page.goto(baseURL);

    // wait for elements to be visible
    await page.waitForSelector("daikin-tab-group", {
      visible: true,
    });

    const fooTab = await page.$('daikin-tab[value="foo"]');
    const barTab = await page.$('daikin-tab[value="bar"]');

    expect(await isActive(fooTab)).toBe(true);
    expect(await isActive(barTab)).toBe(false);

    // click on Baz tab
    await barTab.click();

    // states do not change
    expect(await isActive(fooTab)).toBe(true);
    expect(await isActive(barTab)).toBe(false);
  });
});
