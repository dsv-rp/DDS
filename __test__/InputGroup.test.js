describe('Text input', () => {
    const getPageURL = (disabled, required, error) =>
        `http://localhost:6006/iframe.html?viewMode=story&id=components-input-group--default&args=disabled:${disabled};required:${required};error:${error}`;
    // vision test
    describe.each(['!true', '!false'])('%s', (disabled) => {
        describe.each(['!true', '!false'])('%s', (required) => {
            it.each(['Error text', ''])('%s', async (error) => {
                const baseURL = getPageURL(disabled, required, error);
                await page.goto(baseURL);

                // wait for element to be visible
                const element = await page.waitForSelector(
                    'daikin-input-group',
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
