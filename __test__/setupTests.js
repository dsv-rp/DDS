const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
    blur: 1
});

expect.extend({ toMatchImageSnapshot });

beforeEach( async() => {
    await page.setViewport({
        width: 800,
        height: 600,
        deviceScaleFactor: 1
    });
})
