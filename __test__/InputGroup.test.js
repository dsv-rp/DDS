describe('InputGroup with TextInput', () => {
    const getPageURL = (disabled, required, error) =>
        `http://localhost:6006/iframe.html?viewMode=story&id=components-input-group--default&args=disabled:${disabled};required:${required};error:${error}`;
    // vision test
    describe.each(['disabled', 'enabled'])('%s', (state) => {
        describe.each(['required', 'optional'])('%s', (required) => {
            it.each(['error', 'normal'])('%s', async (error) => {
                const baseURL = getPageURL(
                    state === 'disabled' ? '!true' : '!false',
                    required === 'required' ? '!true' : '!false',
                    error === 'error' ? 'Error text' : '',
                );
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
