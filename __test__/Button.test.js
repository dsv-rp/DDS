describe('Button', () => {
    describe('Primary', () => {
        it('base', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--primary&viewMode=story'
            );
            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('hover', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--primary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });
            await page.hover('daikin-button');

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('disabled', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?args=disabled:true&id=components-button--primary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
    });
    describe('Secondary', () => {
        it('base', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--secondary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('hover', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--secondary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });
            await page.hover('daikin-button');

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('disabled', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?args=disabled:true&id=components-button--secondary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
    });
    describe('Tertiary', () => {
        it('base', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--tertiary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('hover', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--tertiary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });
            await page.hover('daikin-button');

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('disabled', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?args=disabled:true&id=components-button--tertiary&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
    });
    describe('Primary Danger', () => {
        it('base', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--primary-danger&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('hover', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--primary-danger&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });
            await page.hover('daikin-button');

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('focus', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?id=components-button--primary-danger&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });
            await page.focus('daikin-button >>> button');

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
        it('disabled', async () => {
            // APIs from jest-puppeteer
            await page.goto(
                'http://localhost:6006/iframe.html?args=disabled:true&id=components-button--primary-danger&viewMode=story'
            );

            // wait for element to be visible
            await page.waitForSelector('daikin-button', { visible: true });

            const image = await page.screenshot();

            // API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
    });
});
