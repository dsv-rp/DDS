describe('CheckBox', () => {
    const getPageURL = (size, label, labelPosition, checkState) => 
        `http://localhost:6006/iframe.html?viewMode=story&id=components-checkbox--small&args=size:${size};label:${label};labelPosition:${labelPosition};checkState:${checkState}`;
    // vision test
    describe.each(["small", "large"])("%s", (size) => {
        describe.each(["left", "right"])("%s", (labelPosition) => {
            describe.each(["unchecked", "indeterminate", "checked"])("%s", (checkState) => {
                const baseURL = getPageURL(size, "test label", labelPosition, checkState);

                it('enable', async () => {
                    await page.goto(baseURL);

                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
        
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });
        
                it('hover', async () => {
                    await page.goto(baseURL);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
    
                    // hover cursor on the element
                    await element.hover();
        
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });
        
                it('press', async () => {
                    await page.goto(baseURL);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
        
                    // hover cursor on the element and hold down mouse checkbox on the element
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
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
                    
                    // focus on the element
                    // daikin-checkbox itself cannot have a focus as it is not a checkbox element
                    // we have to focus on the internal checkbox element
                    await page.evaluate((container) => {
                        const checkbox = container.shadowRoot.querySelector("input");
                        checkbox.focus();
                    }, element);
    
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });
        
                it('disabled', async () => {
                    // load page with disabled=true
                    await page.goto(`${baseURL};disabled:true`);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
    
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });

                it('error', async () => {
                    // load page with disabled=true
                    expect(true)
                });
            })
        });
    });

    // interaction test
    describe("interaction test", () => {
        const baseURL = getPageURL("small", "test label", "right", "unchecked");
        it("checkbox can click when default", async () => {
            await page.goto(baseURL);

            // wait for element to be visible
            await page.waitForSelector("daikin-checkbox", { visible: true });
            
            // check checkbox element is active
            const isDisabled = await page.$eval("daikin-checkbox", (checkbox) => checkbox.hasAttribute("disabled"))
            expect(isDisabled).toBe(false)
            
        });

        it("checkbox can not click when disabled", async () => {
            await page.goto(`${baseURL};disabled:true`);

            // wait for element to be visible
            await page.waitForSelector("daikin-checkbox", { visible: true });
            
            // check checkbox element is active
            const isDisabled = await page.$eval("daikin-checkbox", (checkbox) => checkbox.hasAttribute("disabled"))
            expect(isDisabled).toBe(true)
            
        })
    });
});