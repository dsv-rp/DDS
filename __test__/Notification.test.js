describe('Notification', () => {
    const getPageURL = (
        variant,
        status,
        line,
        open,
        closeButton,
        actionButtonLabel,
    ) =>
        `http://localhost:6006/iframe.html?viewMode=story&id=components-notification--${variant}&args=status:${status};line:${line};open:${open};closeButton:${closeButton};actionButtonLabel:${actionButtonLabel}`;
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
                describe.each(['!true', '!false'])('%s', (open) => {
                    if (open === '!true') {
                        describe.each(['!true', '!false'])(
                            '%s',
                            (closeButton) => {
                                it.each(['', 'Action'])(
                                    '%s',
                                    async (actionButtonLabel) => {
                                        const baseURL = getPageURL(
                                            variant,
                                            status,
                                            line,
                                            open,
                                            closeButton,
                                            actionButtonLabel,
                                        );
                                        await page.goto(baseURL);

                                        // wait for element to be visible
                                        const element =
                                            await page.waitForSelector(
                                                'daikin-notification',
                                                {
                                                    visible: true,
                                                },
                                            );

                                        // take screenshot and check for diffs
                                        const image =
                                            await element.screenshot();
                                        expect(image).toMatchImageSnapshot();
                                    },
                                );
                            },
                        );
                    }
                });
            });
        });
    });
});
