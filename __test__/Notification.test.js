describe('Notification', () => {
    const getPageURL = (
        variant,
        status,
        line,
        closeButton,
        actionButtonLabel,
    ) =>
        `http://localhost:6006/iframe.html?viewMode=story&id=components-notification--${variant}&args=status:${status};line:${line};open:!true;closeButton:${closeButton};actionButtonLabel:${actionButtonLabel}`;
    // vision test
    describe.each(['toast', 'inline'])('%s', (variant) => {
        describe.each([
            'positive',
            'negative',
            'warning',
            'alarm',
            'information',
        ])('%s', (status) => {
            describe.each(['single', 'multi'])('%s', (line) => {
                describe.each(['!true', '!false'])('%s', (closeButton) => {
                    it.each(['', 'Action'])('%s', async (actionButtonLabel) => {
                        const baseURL = getPageURL(
                            variant,
                            status,
                            line,
                            closeButton,
                            actionButtonLabel,
                        );
                        await page.goto(baseURL);

                        // wait for element to be visible
                        const element = await page.waitForSelector(
                            'daikin-notification',
                            {
                                visible: true,
                            },
                        );

                        // take screenshot and check for diffs
                        const image = await element.screenshot();
                        expect(image).toMatchImageSnapshot();
                    });
                });
            });
        });
    });

    // interaction test
    describe('interaction test', () => {
        it('Can not find the close button by default', async () => {
            await page.goto(
                getPageURL('toast', 'positive', 'single', '!false', ''),
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-notification', {
                visible: true,
            });

            expect(await page.$('daikin-notification >>> div')).toBeTruthy();

            expect(
                await page.$(
                    'daikin-notification >>> ::-p-aria([name="Close"][role="button"])',
                ),
            ).toBeFalsy();
        });
        it('When `closeButton` is true, the close button is found and the Notification disappears when clicked', async () => {
            await page.goto(
                getPageURL('toast', 'positive', 'single', '!true', ''),
                { waitUntil: 'domcontentloaded' },
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-notification', {
                visible: true,
            });

            expect(await page.$('daikin-notification >>> div')).toBeTruthy();

            const closeButton = await page.waitForSelector(
                '::-p-aria([name="Close"][role="button"])',
            );
            await closeButton.click();

            expect(await page.$('daikin-notification >>> div')).toBeFalsy();
        });
        it('Can not find the action button by default inline notification', async () => {
            await page.goto(
                getPageURL('inline', 'positive', 'single', '!false', ''),
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-notification', {
                visible: true,
            });

            expect(await page.$('daikin-notification >>> div')).toBeTruthy();

            expect(
                await page.$(
                    'daikin-notification >>> ::-p-aria([name="Action"][role="button"])',
                ),
            ).toBeFalsy();
        });
        it('When `actionButtonLabel` has one or more characters, an action button is found in inline notification', async () => {
            await page.goto(
                getPageURL('inline', 'positive', 'single', '!false', 'Action'),
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-notification', {
                visible: true,
            });

            expect(await page.$('daikin-notification >>> div')).toBeTruthy();

            expect(
                await page.$(
                    'daikin-notification >>> ::-p-aria([name="Action"][role="button"])',
                ),
            ).toBeTruthy();
        });
    });
});
