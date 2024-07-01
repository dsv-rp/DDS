const isChecked = (elementHandle) => page.evaluate((element) => {
    const innerCheckbox = element.shadowRoot.querySelector("input");
    return innerCheckbox.checked;
}, elementHandle);

describe('Checkbox', () => {
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
        
                it('disabled-enable', async () => {
                    // load page with disabled=true
                    await page.goto(`${baseURL};disabled:true`);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
    
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });

                it('disabled-hover', async () => {
                    // load page with disabled=true
                    await page.goto(`${baseURL};disabled:true`);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
    
                    // take screenshot when hover the checkbox when disabled
                    await element.hover();
                    const imageHover = await element.screenshot();
                    expect(imageHover).toMatchImageSnapshot();
                });

                it('disabled-press', async () => {
                    // load page with disabled=true
                    await page.goto(`${baseURL};disabled:true`);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
    
                    // take screenshot when press the checkbox when disabled
                    await element.hover();
                    await page.mouse.down();        
                    const imagePress = await element.screenshot();
                    await page.mouse.up();
                    expect(imagePress).toMatchImageSnapshot();
                });

                it('disabled-focus', async () => {
                    // load page with disabled=true
                    await page.goto(`${baseURL};disabled:true`);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-checkbox', { visible: true });
    
                    // take screenshot when focus the checkbox when disabled
                    await page.evaluate((container) => {
                        container.focus();
                    }, element);
                    const imageFocus = await element.screenshot();
                    expect(imageFocus).toMatchImageSnapshot();
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
        it("click the checkbox and will be selected when default", async () => {
            await page.goto(baseURL);

            // wait for element to be visible
            const daikinCheckbox = await page.waitForSelector("daikin-checkbox", { visible: true });

            // check daikin-checkbox not be selected
            const isCheckedBefore = await isChecked(daikinCheckbox);
            expect(isCheckedBefore).toBe(false)

            // click daikin-checkbox
            await page.locator('daikin-checkbox').click();
            
            // check daikin-checkbox be selected
            const isCheckedAfter = await isChecked(daikinCheckbox);
            expect(isCheckedAfter).toBe(true);
        });

        it("click the checkbox and will not be selected when disabled", async () => {
            await page.goto(`${baseURL};disabled:true`);

            // wait for element to be visible
            const daikinCheckbox = await page.waitForSelector("daikin-checkbox", { visible: true });
            
            // check daikin-checkbox not be selected
            const isCheckedBefore = await isChecked(daikinCheckbox);
            expect(isCheckedBefore).toBe(false)

            // click daikin-checkbox
            await page.locator('daikin-checkbox').click();
            
            // check daikin-checkbox be selected
            const isCheckedAfter = await isChecked(daikinCheckbox);
            expect(isCheckedAfter).toBe(false);
            
        })
    });
});