describe('Button', () => {
    const getPageURL = (variant, size) => 
        `http://localhost:6006/iframe.html?viewMode=story&id=components-button--primary&args=variant:${variant};size:${size}`;

    // vision test
    describe.each(["primary", "secondary", "tertiary", "primary-danger"])("%s", (variant) => {
        describe.each(["default", "condensed"])("%s", (size) => {
            const baseURL = getPageURL(variant, size);

            it('base', async () => {
                await page.goto(baseURL);

                // wait for element to be visible
                const element = await page.waitForSelector('daikin-button', { visible: true });
    
                // take screenshot and check for diffs
                const image = await element.screenshot();
                expect(image).toMatchImageSnapshot();
            });
    
            it('hover', async () => {
                await page.goto(baseURL);
    
                // wait for element to be visible
                const element = await page.waitForSelector('daikin-button', { visible: true });

                // hover cursor on the element
                await element.hover();
    
                // take screenshot and check for diffs
                const image = await element.screenshot();
                expect(image).toMatchImageSnapshot();
            });
    
            it('press', async () => {
                await page.goto(baseURL);
    
                // wait for element to be visible
                const element = await page.waitForSelector('daikin-button', { visible: true });
    
                // hover cursor on the element and hold down mouse button on the element
                await element.hover();
                await page.mouse.down();
    
                // take screenshot and check for diffs
                const image = await element.screenshot();
                await page.mouse.up();
                expect(image).toMatchImageSnapshot();
            });
    
            it('focus', async () => {
                await page.goto(baseURL);
    
                // wait for element to be visible
                const element = await page.waitForSelector('daikin-button', { visible: true });
                
                // focus on the element
                // daikin-button itself cannot have a focus as it is not a button element
                // we have to focus on the internal button element
                await page.evaluate((container) => {
                    const button = container.shadowRoot.querySelector("button");
                    button.focus();
                }, element);

                // take screenshot and check for diffs
                const image = await element.screenshot();
                expect(image).toMatchImageSnapshot();
            });
    
            it('disabled', async () => {
                // load page with disabled=true
                await page.goto(`${baseURL};disabled:true`);
    
                // wait for element to be visible
                const element = await page.waitForSelector('daikin-button', { visible: true });

                // take screenshot and check for diffs
                const image = await element.screenshot();
                expect(image).toMatchImageSnapshot();
            });
        });
    });

    // interaction test
    describe("interaction test", () => {
        const baseURL = getPageURL("primary", "default");
        it("button can click when default", async () => {
            await page.goto(baseURL);

            // wait for element to be visible
            await page.waitForSelector("daikin-button", { visible: true });
            
            // check button element is active
            const isDisabled = await page.$eval("daikin-button", (button) => button.hasAttribute("disabled"))
            expect(isDisabled).toBe(false)
            
        });

        it("button can not click when disabled", async () => {
            await page.goto(`${baseURL};disabled:true`);

            // wait for element to be visible
            await page.waitForSelector("daikin-button", { visible: true });
            
            // check button element is active
            const isDisabled = await page.$eval("daikin-button", (button) => button.hasAttribute("disabled"))
            expect(isDisabled).toBe(true)
            
        })
    });
});
