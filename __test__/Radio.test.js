describe('Radio', () => {
    const getPageURL = (size, label, labelPosition, checkState) => 
        `http://localhost:6006/iframe.html?viewMode=story&id=components-radio--small&args=size:${size};label:${label};labelPosition:${labelPosition};checked:${checkState}`;
    // vision test
    describe.each(["small", "large"])("%s", (size) => {
        describe.each(["left", "right"])("%s", (labelPosition) => {
            describe.each([false, true])("%s", (checked) => {
                const baseURL = getPageURL(size, "test label", labelPosition, checked);

                it('enable', async () => {
                    await page.goto(`${baseURL};checked:true`);

                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-radio', { visible: true });
        
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });
        
                it('hover', async () => {
                    await page.goto(baseURL);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-radio', { visible: true });
    
                    // hover cursor on the element
                    await element.hover();
        
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });
        
                it('press', async () => {
                    await page.goto(baseURL);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-radio', { visible: true });
        
                    // hover cursor on the element and hold down mouse radio on the element
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
                    const element = await page.waitForSelector('daikin-radio', { visible: true });
                    
                    // focus on the element
                    // daikin-radio itself cannot have a focus as it is not a radio element
                    // we have to focus on the internal radio element
                    await page.evaluate((container) => {
                        const radio = container.shadowRoot.querySelector("input");
                        radio.focus();
                    }, element);
    
                    // take screenshot and check for diffs
                    const image = await element.screenshot();
                    expect(image).toMatchImageSnapshot();
                });
        
                it('disabled', async () => {
                    // load page with disabled=true
                    await page.goto(`${baseURL};disabled:true`);
        
                    // wait for element to be visible
                    const element = await page.waitForSelector('daikin-radio', { visible: true });
    
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
        it("click the radio and will be selected when default", async () => {
            await page.goto(baseURL);

            // wait for element to be visible
            await page.waitForSelector("daikin-radio", { visible: true });

            // check daikin-radio not be selected
            const isCheckedBefore = await page.$eval("daikin-radio", (radio) => {
                const radioElement = radio.shadowRoot.querySelector("input");
                return radioElement.checked;
            })
            expect(isCheckedBefore).toBe(false)

            // click daikin-radio
            await page.locator('daikin-radio').click();
            
            // check daikin-radio be selected
            const isCheckedAfter = await page.$eval("daikin-radio", (radio) => {
                const radioElement = radio.shadowRoot.querySelector("input");
                return radioElement.checked;
            })
            expect(isCheckedAfter).toBe(true);
        });

        it("click the radio and will not be selected when disabled", async () => {
            await page.goto(`${baseURL};disabled:true`);

            // wait for element to be visible
            await page.waitForSelector("daikin-radio", { visible: true });
            
            // check daikin-radio not be selected
            const isCheckedBefore = await page.$eval("daikin-radio", (radio) => {
                const radioElement = radio.shadowRoot.querySelector("input");
                return radioElement.checked
            })
            expect(isCheckedBefore).toBe(false)

            // click daikin-radio
            await page.locator('daikin-radio').click();
            
            // check daikin-radio be selected
            const isCheckedAfter = await page.$eval("daikin-radio", (radio) => {
                const radioElement = radio.shadowRoot.querySelector("input");
                return radioElement.checked
            })
            expect(isCheckedAfter).toBe(false);
            
        })
    });
});